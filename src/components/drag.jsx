import { useEffect, useState, useRef } from "react"
import { Button, Input, Switch, Tabs } from "antd"
import interact from "interactjs"

const initialLayout = {
  id: "root",
  parentId: null,
  type: "root",
  styles: {
    width: "440px", 
    maxWidth: "440px",
    minHeight: "90vh",
    overflow: "hidden",
    position: "relative",
  },
  children: [
    {
      id: "page-1",
      parentId: "root",
      type: "column",
      styles: {
        width: "100%",
        maxWidth: "440px",
        height: "100%",
        minHeight: "90vh",
        border: "1px solid #ccc",
        padding: "10px",
        overflow: "auto",
        position: "relative",
        background: "#f9f9f9",
      },
      children: [],
    },
  ],
}

const componentsList = [
  { id: "button", type: "button", label: "Button" },
  { id: "input", type: "input", label: "Input" },
  { id: "switch", type: "switch", label: "Switch" },
  { id: "container", type: "container", label: "Container" },
]

const AntDDragDropLayout = () => {
  const [layout, setLayout] = useState(initialLayout)
  const [activePage, setActivePage] = useState("page-1")
  const [pages, setPages] = useState(["page-1"])
  const droppableRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)
  const [lastInteractedId, setLastInteractedId] = useState(null)

  // Initialize and clean up interact.js
  useEffect(() => {
    interact(".draggable").unset()
    interact(".droppable").unset()
    interact(".resizable").unset()
    interact(".resizable-handle").unset()

    // Configure draggable elements
    interact(".draggable").draggable({
      autoScroll: true,
      inertia: false,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: ".droppable",
          endOnly: true,
        }),
      ],
      ignoreFrom: ".resizable-handle, .delete-button",
      listeners: {
        start(event) {
          event.target.classList.add("dragging")
          const id = event.target.getAttribute("data-id")
          if (id) setLastInteractedId(id)

          const rect = event.target.getBoundingClientRect()
          const offsetX = event.clientX - rect.left
          const offsetY = event.clientY - rect.top

          event.target.setAttribute("data-offset-x", offsetX)
          event.target.setAttribute("data-offset-y", offsetY)
        },
        move(event) {
          if (isResizing) return

          const target = event.target
          const x = (Number.parseFloat(target.getAttribute("data-x")) || 0) + event.dx
          const y = (Number.parseFloat(target.getAttribute("data-y")) || 0) + event.dy

          target.style.transform = `translate(${x}px, ${y}px)`
          target.setAttribute("data-x", x)
          target.setAttribute("data-y", y)
        },
        end(event) {
          event.target.classList.remove("dragging")
          if (isResizing) return

          const target = event.target
          const id = target.getAttribute("data-id")
          if (!id) return

          const x = Number.parseFloat(target.getAttribute("data-x")) || 0
          const y = Number.parseFloat(target.getAttribute("data-y")) || 0

          target.style.transform = "none"
          target.setAttribute("data-x", "0")
          target.setAttribute("data-y", "0")

          updateComponentPosition(id, x, y)
        },
      },
    })

    // Configure dropzones
    interact(".droppable").dropzone({
      accept: ".draggable",
      overlap: 0.3,
      ondropactivate: (event) => {
        event.target.classList.add("drop-active")
      },
      ondrop(event) {
        const id = event.relatedTarget.getAttribute("data-id")
        const type = event.relatedTarget.getAttribute("data-type")
        if (!type) return

        const dropTarget = event.target
        const dropRect = dropTarget.getBoundingClientRect()
        const scrollLeft = dropTarget.scrollLeft || 0
        const scrollTop = dropTarget.scrollTop || 0

        const dragOffsetX = Number.parseFloat(event.relatedTarget.getAttribute("data-offset-x") || "0")
        const dragOffsetY = Number.parseFloat(event.relatedTarget.getAttribute("data-offset-y") || "0")

        // Fix for the positioning issue - get the correct coordinates relative to the drop target
        const dropTargetPosition = dropTarget.getBoundingClientRect()
        const relativeX = event.dragEvent.clientX - dropTargetPosition.left
        const relativeY = event.dragEvent.clientY - dropTargetPosition.top

        // Adjust for scroll and drag offset
        let dropX = relativeX + scrollLeft - dragOffsetX
        const dropY = relativeY + scrollTop - dragOffsetY

        const parentId = dropTarget.getAttribute("data-id") || activePage

        const componentWidth = event.relatedTarget.offsetWidth || (type === "container" ? 200 : 100)

        const maxX = dropRect.width - componentWidth - 10
        dropX = Math.max(0, Math.min(dropX, maxX))

        if (id) {
          updateComponentPosition(id, dropX, dropY, parentId, true)
        } else {
          addComponent(type, dropX, dropY, parentId)
        }

        Object.assign(event.relatedTarget.style, {
          transform: "none",
          left: `${dropX}px`,
          top: `${dropY}px`,
        })

        event.relatedTarget.removeAttribute("data-x")
        event.relatedTarget.removeAttribute("data-y")
        event.relatedTarget.removeAttribute("data-offset-x")
        event.relatedTarget.removeAttribute("data-offset-y")
      },
      ondragenter(event) {
        event.target.classList.add("highlight")
      },
      ondragleave(event) {
        event.target.classList.remove("highlight")
      },
      ondropdeactivate(event) {
        event.target.classList.remove("drop-active")
        event.target.classList.remove("highlight")
        console.log("Updated Layout:", JSON.stringify(layout, null, 2))
      },
    })

    // 3. Fix the resizing issue
    // Update the resizable configuration in the useEffect
    interact(".resizable").resizable({
      edges: { left: false, right: true, bottom: true, top: false },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 100, height: 100 },
          max: { width: 440 },
        }),
      ],
      inertia: false,
      allowFrom: ".resizable-handle",
      listeners: {
        start(event) {
          setIsResizing(true)
          event.target.classList.add("resizing")
          const target = event.target
          target.setAttribute("data-initial-width", target.offsetWidth)
          target.setAttribute("data-initial-height", target.offsetHeight)
          // Don't disable draggable during resize
        },
        move(event) {
          const target = event.target
          const id = target.getAttribute("data-id")

          const initialWidth = Number.parseFloat(target.getAttribute("data-initial-width")) || event.rect.width
          const initialHeight = Number.parseFloat(target.getAttribute("data-initial-height")) || event.rect.height

          const width = initialWidth + event.deltaRect.width
          const height = initialHeight + event.deltaRect.height

          target.style.width = `${width}px`
          target.style.height = `${height}px`

          updateContainerSize(id, width, height)
        },
        end(event) {
          event.target.classList.remove("resizing")
          setIsResizing(false)
          event.target.removeAttribute("data-initial-width")
          event.target.removeAttribute("data-initial-height")
          // No need for setTimeout or re-enabling draggable
        },
      },
    })

    interact(".resizable-handle").on("down", (event) => {
      event.stopPropagation()
    })

    interact.supportsTouch(true)

    return () => {
      interact(".draggable").unset()
      interact(".droppable").unset()
      interact(".resizable").unset()
      interact(".resizable-handle").unset()
    }
  }, [layout, isResizing, activePage])

  const addComponent = (type, x, y, parentId = activePage) => {
    const component = componentsList.find((comp) => comp.type === type)
    if (!component) return

    const uniqueId = `${component.id}-${Date.now()}`
    const newComponent = {
      id: uniqueId,
      parentId,
      type: component.type,
      styles: {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        zIndex: "10",
        ...(type === "container"
          ? {
              width: "200px",
              height: "150px",
              border: "2px solid #000",
              display: "flex",
              background: "#f5f5f5",
              padding: "5px",
              overflow: "visible",
              position: "relative",
            }
          : {}),
      },
      label: component.label,
      children: type === "container" ? [] : undefined,
    }

    setLastInteractedId(uniqueId)

    setLayout((prevLayout) => {
      const updatedLayout = { ...prevLayout }

      const insertIntoParent = (parent, newComponent) => {
        if (parent.id === parentId) {
          parent.children = [...(parent.children || []), newComponent]
          return parent
        } else if (parent.children) {
          parent.children = parent.children.map((child) => insertIntoParent({ ...child }, newComponent))
        }
        return parent
      }

      return insertIntoParent(updatedLayout, newComponent)
    })
  }

  const updateComponentPosition = (id, x, y, newParentId = null, isDrop = false) => {
    setLayout((prevLayout) => {
      const newLayout = JSON.parse(JSON.stringify(prevLayout))

      let componentToUpdate = null
      let currentParent = null

      const findComponentAndParent = (parent, componentId) => {
        if (!parent.children) return false

        for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i].id === componentId) {
            componentToUpdate = parent.children[i]
            currentParent = parent
            return true
          }

          if (parent.children[i].children && findComponentAndParent(parent.children[i], componentId)) {
            return true
          }
        }

        return false
      }

      findComponentAndParent(newLayout, id)

      if (!componentToUpdate) return prevLayout

      const prevLeft = Number.parseFloat(componentToUpdate.styles.left) || 0
      const prevTop = Number.parseFloat(componentToUpdate.styles.top) || 0

      componentToUpdate.styles.left = isDrop ? `${x}px` : `${prevLeft + x}px`
      componentToUpdate.styles.top = isDrop ? `${y}px` : `${prevTop + y}px`

      if (newParentId && newParentId !== componentToUpdate.parentId) {
        componentToUpdate.parentId = newParentId

        currentParent.children = currentParent.children.filter((child) => child.id !== id)

        const findNewParentAndAddComponent = (parent, parentId) => {
          if (parent.id === parentId) {
            if (!parent.children) parent.children = []
            parent.children.push(componentToUpdate)
            return true
          }

          if (parent.children) {
            for (let i = 0; i < parent.children.length; i++) {
              if (findNewParentAndAddComponent(parent.children[i], parentId)) {
                return true
              }
            }
          }

          return false
        }

        findNewParentAndAddComponent(newLayout, newParentId)
      }

      return newLayout
    })
  }

  const updateContainerSize = (id, width, height) => {
    if (!id) return

    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout }

      const findContainer = (children) => {
        for (let i = 0; i < children.length; i++) {
          if (children[i].id === id) {
            const updatedContainer = {
              ...children[i],
              styles: {
                ...children[i].styles,
                width: `${width}px`,
                height: `${height}px`,
              },
            }

            const newChildren = [...children]
            newChildren[i] = updatedContainer
            return { found: true, children: newChildren }
          }

          if (children[i].children) {
            const result = findContainer(children[i].children)
            if (result.found) {
              const newChildren = [...children]
              newChildren[i] = {
                ...children[i],
                children: result.children,
              }
              return { found: true, children: newChildren }
            }
          }
        }
        return { found: false, children }
      }

      const result = findContainer(newLayout.children)
      if (result.found) {
        newLayout.children = result.children
        return newLayout
      }
      return prevLayout
    })
  }

  // Also update the addPage function to ensure new pages have the same width constraint
  const addPage = () => {
    const pageNumber = pages.length + 1
    const newPageId = `page-${pageNumber}`

    setPages([...pages, newPageId])
    setActivePage(newPageId)

    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout }

      // Add the new page to the root's children with width constraint
      newLayout.children.push({
        id: newPageId,
        parentId: "root",
        type: "column",
        styles: {
          width: "100%",
          maxWidth: "440px", // Add maxWidth constraint
          height: "100%",
          minHeight: "90vh",
          border: "1px solid #ccc",
          padding: "10px",
          overflow: "auto",
          position: "relative",
          background: "#f9f9f9",
        },
        children: [],
      })

      return newLayout
    })
  }

  // New function to delete a component
  const deleteComponent = (id) => {
    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout }

      const removeComponent = (parent) => {
        if (!parent.children) return parent

        parent.children = parent.children.filter((child) => child.id !== id)
        parent.children = parent.children.map((child) => removeComponent(child))

        return parent
      }

      return removeComponent(newLayout)
    })
  }

  const findAllChildren = (components, parentId) => {
    if (!components) return []
    return components.filter((component) => component.parentId === parentId)
  }

  const renderComponents = (components, parentId) => {
    const children = findAllChildren(components, parentId)

    return children.map((child) => {
      const adjustedStyles = {
        ...child.styles,
        position: "absolute",
        pointerEvents: "auto",
      }

      if (child.id === lastInteractedId) {
        adjustedStyles.zIndex = "100"
      }

      if (parentId !== activePage && parentId !== "root") {
        adjustedStyles.zIndex = (Number.parseInt(adjustedStyles.zIndex) || 1) + 1000
      }

      let content
      // 2. Fix the container droppable area issue
      // Update the container content in renderComponents function
      switch (child.type) {
        case "button":
          content = <Button>{child.label}</Button>
          break
        case "input":
          content = <Input placeholder={child.label} />
          break
        case "switch":
          content = <Switch />
          break
        case "container":
          content = (
            <>
              <div className="container-label">{child.label}</div>
              {/* Make the entire container droppable by applying droppable class to the main container div */}
              <div
                className="container-content"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "visible",
                }}
              >
                {renderComponents(child.children || [], child.id)}
              </div>
              <div
                className="resizable-handle"
                style={{
                  position: "absolute",
                  right: "0",
                  bottom: "0",
                  width: "10px",
                  height: "10px",
                  background: "#1890ff",
                  cursor: "nwse-resize",
                }}
              />
            </>
          )
          break
        default:
          content = <div>{child.label}</div>
      }

      // Update the container rendering to make the entire container droppable
      return (
        <div
          key={child.id}
          className={`draggable ${child.type === "container" ? "resizable" : ""} droppable`}
          data-id={child.id}
          data-type={child.type}
          data-parent-id={child.parentId}
          style={adjustedStyles}
          onClick={() => {
            setLastInteractedId(child.id)
          }}
        >
          <div
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation()
              deleteComponent(child.id)
            }}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "red",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: "1000",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            ×
          </div>
          {content}
        </div>
      )
    })
  }

  // Find the active page from the layout
  const getActivePage = () => {
    return layout.children.find((child) => child.id === activePage)
  }

  useEffect(() => {
    if (droppableRef.current) {
      const width = droppableRef.current.offsetWidth
      setLayout((prev) => ({
        ...prev,
        styles: {
          ...prev.styles,
          width: `${width}px`,
        },
      }))
    }
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div style={{ width: "30%", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Available Components</h3>
          {componentsList.map((component) => (
            <div
              key={component.id}
              className="draggable"
              data-type={component.type}
              style={{
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ccc",
                cursor: "grab",
                background: "#f9f9f9",
                touchAction: "none",
              }}
            >
              {component.type === "button" && <Button>{component.label}</Button>}
              {component.type === "input" && <Input placeholder={component.label} />}
              {component.type === "switch" && <Switch />}
              {component.type === "container" && <div>{component.label}</div>}
            </div>
          ))}

          {/* Add Page Button */}
          <Button type="primary" style={{ marginTop: "20px", width: "100%" }} onClick={addPage}>
            Add Page
          </Button>
        </div>

        <div style={{ width: "70%" }}>
          <Tabs
            activeKey={activePage}
            onChange={setActivePage}
            type="card"
            items={pages.map((pageId) => ({
              key: pageId,
              label: pageId.replace("-", " ").toUpperCase(),
            }))}
          />

          <div className="droppable" data-id={activePage} style={getActivePage()?.styles || {}} ref={droppableRef}>
            {getActivePage() && renderComponents(getActivePage().children, activePage)}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .highlight {
          background-color: rgba(0, 255, 0, 0.1) !important;
          border: 2px dashed green !important;
        }

        .drop-active {
          border-color: #aaa;
        }

        .draggable {
          touch-action: none;
          user-select: none;
        }

        * {
          -webkit-user-drag: none;
          user-select: none;
        }

        .resizing {
          opacity: 0.8;
          outline: 2px dashed #1890ff;
          pointer-events: none !important;
        }

        .resizable-handle {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
          transition: background-color 0.2s;
          pointer-events: auto !important;
        }

        .resizable-handle:hover {
          background-color: #ff4d4f !important;
          transform: scale(1.1);
        }

        .resizable {
          box-sizing: border-box;
          min-width: 100px;
          min-height: 100px;
          position: relative;
        }

        .dragging {
          opacity: 0.8;
          pointer-events: none;
          z-index: 1000 !important;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .droppable > .draggable {
          pointer-events: auto !important;
        }

        .delete-button:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  )
}

export default AntDDragDropLayout


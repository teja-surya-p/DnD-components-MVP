"use client";

import { useEffect, useState, useRef } from "react";
import interact from "interactjs";
import { initialLayout, componentsList } from "./constants";
import { findComponentById } from "./utils";
import ComponentsPanel from "./components-panel";
import Canvas from "./canvas";
import PropertiesPanel from "./properties-panel";
import ComponentRenderer from "./component-renderer";

const AntDDragDropLayout = () => {
  const [layout, setLayout] = useState(initialLayout);
  const [activePage, setActivePage] = useState("page-1");
  const [pages, setPages] = useState(["page-1"]);
  const droppableRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [lastInteractedId, setLastInteractedId] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [alignmentGuides, setAlignmentGuides] = useState({
    horizontal: null,
    vertical: null,
    center: null,
  });

  // Update the selected component when lastInteractedId changes
  useEffect(() => {
    if (lastInteractedId) {
      const component = findComponentById(layout, lastInteractedId);
      setSelectedComponent(component);
    } else {
      setSelectedComponent(null);
    }
    console.log(layout);
  }, [lastInteractedId, layout]);

  // Initialize and clean up interact.js
  useEffect(() => {
    interact(".draggable").unset();
    interact(".droppable").unset();
    interact(".resizable").unset();
    interact(".resizable-handle").unset();

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
          event.target.classList.add("dragging");
          const id = event.target.getAttribute("data-id");
          if (id) setLastInteractedId(id);

          const rect = event.target.getBoundingClientRect();
          const offsetX = event.clientX - rect.left;
          const offsetY = event.clientY - rect.top;

          event.target.setAttribute("data-offset-x", offsetX);
          event.target.setAttribute("data-offset-y", offsetY);
        },
        move(event) {
          if (isResizing) return;

          const target = event.target;
          const x =
            (Number.parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
          const y =
            (Number.parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute("data-x", x);
          target.setAttribute("data-y", y);

          // Check for alignment guides
          const dropTarget = document.querySelector(
            `.droppable[data-id="${activePage}"]`
          );
          if (dropTarget) {
            const dropRect = dropTarget.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            // Center alignment
            const centerX = dropRect.left + dropRect.width / 2;
            const targetCenterX = targetRect.left + targetRect.width / 2;

            if (Math.abs(targetCenterX - centerX) < 5) {
              setAlignmentGuides((prev) => ({ ...prev, center: true }));
            } else {
              setAlignmentGuides((prev) => ({ ...prev, center: false }));
            }

            // Horizontal middle alignment
            const middleY = dropRect.top + dropRect.height / 2;
            const targetMiddleY = targetRect.top + targetRect.height / 2;

            if (Math.abs(targetMiddleY - middleY) < 5) {
              setAlignmentGuides((prev) => ({ ...prev, horizontal: true }));
            } else {
              setAlignmentGuides((prev) => ({ ...prev, horizontal: false }));
            }

            // Vertical center alignment
            if (
              Math.abs(targetRect.left - dropRect.left) < 5 ||
              Math.abs(
                targetRect.left +
                  targetRect.width -
                  (dropRect.left + dropRect.width)
              ) < 5
            ) {
              setAlignmentGuides((prev) => ({ ...prev, vertical: true }));
            } else {
              setAlignmentGuides((prev) => ({ ...prev, vertical: false }));
            }
          }
        },
        end(event) {
          event.target.classList.remove("dragging");
          if (isResizing) return;

          const target = event.target;
          const id = target.getAttribute("data-id");
          if (!id) return;

          const x = Number.parseFloat(target.getAttribute("data-x")) || 0;
          const y = Number.parseFloat(target.getAttribute("data-y")) || 0;

          target.style.transform = "none";
          target.setAttribute("data-x", "0");
          target.setAttribute("data-y", "0");

          updateComponentPosition(id, x, y);

          // Clear alignment guides
          setAlignmentGuides({
            horizontal: null,
            vertical: null,
            center: null,
          });
        },
      },
    });

    // Configure dropzones
    interact(".droppable").dropzone({
      accept: ".draggable",
      overlap: 0.3,
      ondropactivate: (event) => {
        event.target.classList.add("drop-active");
      },
      ondrop(event) {
        const id = event.relatedTarget.getAttribute("data-id");
        const type = event.relatedTarget.getAttribute("data-type");
        if (!type) return;

        const dropTarget = event.target;
        const scrollLeft = dropTarget.scrollLeft || 0;
        const scrollTop = dropTarget.scrollTop || 0;

        const dragOffsetX = Number.parseFloat(
          event.relatedTarget.getAttribute("data-offset-x") || "0"
        );
        const dragOffsetY = Number.parseFloat(
          event.relatedTarget.getAttribute("data-offset-y") || "0"
        );

        // Fix for the positioning issue - get the correct coordinates relative to the drop target
        const dropTargetPosition = dropTarget.getBoundingClientRect();
        const relativeX = event.dragEvent.clientX - dropTargetPosition.left;
        const relativeY = event.dragEvent.clientY - dropTargetPosition.top;

        // Adjust for scroll and drag offset
        const dropX = relativeX - dragOffsetX;
        const dropY = relativeY - dragOffsetY;

        const parentId = dropTarget.getAttribute("data-id") || activePage;

        if (id) {
          updateComponentPosition(id, dropX, dropY, parentId, true);
        } else {
          addComponent(type, dropX, dropY, parentId);
        }

        Object.assign(event.relatedTarget.style, {
          transform: "none",
          left: `${dropX}px`,
          top: `${dropY}px`,
        });

        event.relatedTarget.removeAttribute("data-x");
        event.relatedTarget.removeAttribute("data-y");
        event.relatedTarget.removeAttribute("data-offset-x");
        event.relatedTarget.removeAttribute("data-offset-y");

        // Clear alignment guides
        setAlignmentGuides({
          horizontal: null,
          vertical: null,
          center: null,
        });
      },
      ondragenter(event) {
        event.target.classList.add("highlight");
      },
      ondragleave(event) {
        event.target.classList.remove("highlight");
      },
      ondropdeactivate(event) {
        event.target.classList.remove("drop-active");
        event.target.classList.remove("highlight");
      },
    });

    // Update the resizable configuration in the useEffect
    interact(".resizable").resizable({
      edges: { left: false, right: true, bottom: true, top: false },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: 100, height: 100 },
        }),
      ],
      inertia: false,
      allowFrom: ".resizable-handle",
      listeners: {
        start(event) {
          setIsResizing(true);
          event.target.classList.add("resizing");
          const target = event.target;
          target.setAttribute("data-initial-width", target.offsetWidth);
          target.setAttribute("data-initial-height", target.offsetHeight);
        },
        move(event) {
          const target = event.target;
          const id = target.getAttribute("data-id");

          const initialWidth =
            Number.parseFloat(target.getAttribute("data-initial-width")) ||
            event.rect.width;
          const initialHeight =
            Number.parseFloat(target.getAttribute("data-initial-height")) ||
            event.rect.height;

          const width = initialWidth + event.deltaRect.width;
          const height = initialHeight + event.deltaRect.height;

          target.style.width = `${width}px`;
          target.style.height = `${height}px`;

          updateContainerSize(id, width, height);
        },
        end(event) {
          event.target.classList.remove("resizing");
          setIsResizing(false);
          event.target.removeAttribute("data-initial-width");
          event.target.removeAttribute("data-initial-height");
        },
      },
    });

    interact(".resizable-handle").on("down", (event) => {
      event.stopPropagation();
    });

    interact.supportsTouch(true);

    return () => {
      interact(".draggable").unset();
      interact(".droppable").unset();
      interact(".resizable").unset();
      interact(".resizable-handle").unset();
    };
  }, [layout, isResizing, activePage]);

  const addComponent = (type, x, y, parentId = activePage) => {
    const component = componentsList.find((comp) => comp.type === type);
    if (!component) return;

    const uniqueId = `${component.id}-${Date.now()}`;
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
        ...(type === "text"
          ? {
              fontSize: "16px",
              fontWeight: "normal",
              color: "#000000",
              textAlign: "left",
            }
          : {}),
      },
      label: component.label,
      children: type === "container" ? [] : undefined,
      content: type === "text" ? "Edit this text" : undefined,
    };

    setLastInteractedId(uniqueId);

    setLayout((prevLayout) => {
      const updatedLayout = { ...prevLayout };

      const insertIntoParent = (parent, newComponent) => {
        if (parent.id === parentId) {
          parent.children = [...(parent.children || []), newComponent];
          return parent;
        } else if (parent.children) {
          parent.children = parent.children.map((child) =>
            insertIntoParent({ ...child }, newComponent)
          );
        }
        return parent;
      };

      return insertIntoParent(updatedLayout, newComponent);
    });
  };

  const updateComponentPosition = (
    id,
    x,
    y,
    newParentId = null,
    isDrop = false
  ) => {
    setLayout((prevLayout) => {
      const newLayout = JSON.parse(JSON.stringify(prevLayout));

      let componentToUpdate = null;
      let currentParent = null;

      const findComponentAndParent = (parent, componentId) => {
        if (!parent.children) return false;

        for (let i = 0; i < parent.children.length; i++) {
          if (parent.children[i].id === componentId) {
            componentToUpdate = parent.children[i];
            currentParent = parent;
            return true;
          }

          if (
            parent.children[i].children &&
            findComponentAndParent(parent.children[i], componentId)
          ) {
            return true;
          }
        }

        return false;
      };

      findComponentAndParent(newLayout, id);

      if (!componentToUpdate) return prevLayout;

      const prevLeft = Number.parseFloat(componentToUpdate.styles.left) || 0;
      const prevTop = Number.parseFloat(componentToUpdate.styles.top) || 0;

      componentToUpdate.styles.left = isDrop ? `${x}px` : `${prevLeft + x}px`;
      componentToUpdate.styles.top = isDrop ? `${y}px` : `${prevTop + y}px`;

      if (newParentId && newParentId !== componentToUpdate.parentId) {
        componentToUpdate.parentId = newParentId;

        currentParent.children = currentParent.children.filter(
          (child) => child.id !== id
        );

        const findNewParentAndAddComponent = (parent, parentId) => {
          if (parent.id === parentId) {
            if (!parent.children) parent.children = [];
            parent.children.push(componentToUpdate);
            return true;
          }

          if (parent.children) {
            for (let i = 0; i < parent.children.length; i++) {
              if (findNewParentAndAddComponent(parent.children[i], parentId)) {
                return true;
              }
            }
          }

          return false;
        };

        findNewParentAndAddComponent(newLayout, newParentId);
      }

      return newLayout;
    });
  };

  const updateContainerSize = (id, width, height) => {
    if (!id) return;

    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout };

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
            };

            const newChildren = [...children];
            newChildren[i] = updatedContainer;
            return { found: true, children: newChildren };
          }

          if (children[i].children) {
            const result = findContainer(children[i].children);
            if (result.found) {
              const newChildren = [...children];
              newChildren[i] = {
                ...children[i],
                children: result.children,
              };
              return { found: true, children: newChildren };
            }
          }
        }
        return { found: false, children };
      };

      const result = findContainer(newLayout.children);
      if (result.found) {
        newLayout.children = result.children;
        return newLayout;
      }
      return prevLayout;
    });
  };

  const addPage = () => {
    const pageNumber = pages.length + 1;
    const newPageId = `page-${pageNumber}`;

    setPages([...pages, newPageId]);
    setActivePage(newPageId);

    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout };

      // Add the new page to the root's children with width constraint
      newLayout.children.push({
        id: newPageId,
        parentId: "root",
        type: "column",
        styles: {
          width: "100%",
          height: "100%",
          minHeight: "90vh",
          border: "1px solid #ccc",
          padding: "10px",
          overflow: "auto",
          position: "relative",
          background: "#f9f9f9",
        },
        children: [],
      });

      return newLayout;
    });
  };

  // Delete a component
  const deleteComponent = (id) => {
    setLayout((prevLayout) => {
      const newLayout = { ...prevLayout };

      const removeComponent = (parent) => {
        if (!parent.children) return parent;

        parent.children = parent.children.filter((child) => child.id !== id);
        parent.children = parent.children.map((child) =>
          removeComponent(child)
        );

        return parent;
      };

      return removeComponent(newLayout);
    });
  };

  // Update component styles
  const updateComponentStyles = (id, styles) => {
    setLayout((prevLayout) => {
      const newLayout = JSON.parse(JSON.stringify(prevLayout));

      const updateStyles = (parent) => {
        if (!parent.children) return parent;

        parent.children = parent.children.map((child) => {
          if (child.id === id) {
            return {
              ...child,
              styles: {
                ...child.styles,
                ...styles,
              },
            };
          }
          return updateStyles(child);
        });

        return parent;
      };

      return updateStyles(newLayout);
    });
  };

  // Update component content
  const updateComponentContent = (id, content) => {
    setLayout((prevLayout) => {
      const newLayout = JSON.parse(JSON.stringify(prevLayout));

      const updateContent = (parent) => {
        if (!parent.children) return parent;

        parent.children = parent.children.map((child) => {
          if (child.id === id) {
            return {
              ...child,
              content,
            };
          }
          return updateContent(child);
        });

        return parent;
      };

      return updateContent(newLayout);
    });
  };

  // Find the active page from the layout
  const getActivePage = () => {
    return layout.children.find((child) => child.id === activePage);
  };

  useEffect(() => {
    if (droppableRef.current) {
      const width = droppableRef.current.offsetWidth;
      setLayout((prev) => ({
        ...prev,
        styles: {
          ...prev.styles,
          width: `${width}px`,
        },
      }));
    }
  }, []);

  // Render components recursively
  const renderComponents = (components, parentId) => {
    return (
      <ComponentRenderer
        components={components}
        parentId={parentId}
        activePage={activePage}
        lastInteractedId={lastInteractedId}
        setLastInteractedId={setLastInteractedId}
        deleteComponent={deleteComponent}
        renderComponents={renderComponents}
      />
    );
  };

  return (
    <div className="layout-container">
      <div className="components-container">
        <ComponentsPanel componentsList={componentsList} addPage={addPage} />
      </div>
      <div className="canvas-container">
        <Canvas
          activePage={activePage}
          setActivePage={setActivePage}
          pages={pages}
          getActivePage={getActivePage}
          droppableRef={droppableRef}
          alignmentGuides={alignmentGuides}
          layout={layout}
          lastInteractedId={lastInteractedId}
          setLastInteractedId={setLastInteractedId}
          deleteComponent={deleteComponent}
          renderComponents={renderComponents}
        />
      </div>
      <div className="properties-container">
        <PropertiesPanel
          selectedComponent={selectedComponent}
          updateComponentStyles={updateComponentStyles}
          updateComponentContent={updateComponentContent}
        />
      </div>

      <style jsx>{`
        .layout-container {
          display: flex;
          height: 100vh;
          padding: 20px;
          gap: 20px;
          background-color: #f5f5f5;
        }

        .components-container {
          width: 250px;
        }

        .canvas-container {
          flex: 1;
        }

        .properties-container {
          width: 300px;
        }
      `}</style>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

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

        .alignment-guide {
          position: absolute;
          background-color: #1890ff;
          pointer-events: none;
          z-index: 1000;
        }

        .center-guide {
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          transform: translateX(-50%);
        }

        .horizontal-guide {
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          transform: translateY(-50%);
        }

        .vertical-guide {
          top: 0;
          height: 100%;
          width: 1px;
        }

        .ant-icon {
          width: 1em;
          height: 1em;
          display: inline-flex;
          align-items: center;
          margin-right: 4px;
        }
      `}</style>
    </div>
  );
};

export default AntDDragDropLayout;

// Parse CSS value to get number and unit
export const parseCssValue = (value) => {
    if (!value || typeof value !== "string") return { value: 0, unit: "px" }
    const match = value.match(/^([\d.]+)(\D+)$/)
    if (match) {
      return { value: Number.parseFloat(match[1]), unit: match[2] }
    }
    return { value: Number.parseFloat(value) || 0, unit: "px" }
  }
  
  // Format CSS value with unit
  export const formatCssValue = (value, unit = "px") => {
    return `${value}${unit}`
  }
  
  // Parse CSS shorthand property (like padding, margin)
  export const parseCssShorthand = (value) => {
    if (!value || typeof value !== "string") {
      return { top: 0, right: 0, bottom: 0, left: 0, unit: "px" }
    }
  
    const values = value.trim().split(/\s+/)
    let top,
      right,
      bottom,
      left,
      unit = "px"
  
    if (values.length === 1) {
      const parsed = parseCssValue(values[0])
      top = right = bottom = left = parsed.value
      unit = parsed.unit
    } else if (values.length === 2) {
      const parsedV = parseCssValue(values[0])
      const parsedH = parseCssValue(values[1])
      top = bottom = parsedV.value
      right = left = parsedH.value
      unit = parsedV.unit // Assuming same unit for all
    } else if (values.length === 3) {
      const parsedTop = parseCssValue(values[0])
      const parsedH = parseCssValue(values[1])
      const parsedBottom = parseCssValue(values[2])
      top = parsedTop.value
      right = left = parsedH.value
      bottom = parsedBottom.value
      unit = parsedTop.unit // Assuming same unit for all
    } else if (values.length === 4) {
      const parsedTop = parseCssValue(values[0])
      const parsedRight = parseCssValue(values[1])
      const parsedBottom = parseCssValue(values[2])
      const parsedLeft = parseCssValue(values[3])
      top = parsedTop.value
      right = parsedRight.value
      bottom = parsedBottom.value
      left = parsedLeft.value
      unit = parsedTop.unit // Assuming same unit for all
    }
  
    return { top, right, bottom, left, unit }
  }
  
  // Format CSS shorthand property
  export const formatCssShorthand = (top, right, bottom, left, unit = "px") => {
    if (top === right && right === bottom && bottom === left) {
      return `${top}${unit}`
    } else if (top === bottom && right === left) {
      return `${top}${unit} ${right}${unit}`
    } else if (right === left) {
      return `${top}${unit} ${right}${unit} ${bottom}${unit}`
    } else {
      return `${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit}`
    }
  }
  
  // Parse border property
  export const parseBorder = (value) => {
    if (!value || typeof value !== "string") {
      return { width: 0, style: "solid", color: "#000000", unit: "px" }
    }
  
    const parts = value.trim().split(/\s+/)
    let width = 1,
      style = "solid",
      color = "#000000",
      unit = "px"
  
    for (const part of parts) {
      if (part.match(/^\d+(\.\d+)?(px|em|rem|%)$/)) {
        const parsed = parseCssValue(part)
        width = parsed.value
        unit = parsed.unit
      } else if (
        ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"].includes(part)
      ) {
        style = part
      } else if (
        part.match(/^#[0-9a-f]{3,8}$/i) ||
        part.match(/^rgb/i) ||
        part.match(/^hsl/i) ||
        ["transparent", "currentColor"].includes(part)
      ) {
        color = part
      }
    }
  
    return { width, style, color, unit }
  }
  
  // Format border property
  export const formatBorder = (width, style, color, unit = "px") => {
    return `${width}${unit} ${style} ${color}`
  }
  
  // Parse border radius
  export const parseBorderRadius = (value) => {
    return parseCssShorthand(value)
  }
  
  // Format border radius
  export const formatBorderRadius = (topLeft, topRight, bottomRight, bottomLeft, unit = "px") => {
    return formatCssShorthand(topLeft, topRight, bottomRight, bottomLeft, unit)
  }
  
  // Parse background
  export const parseBackground = (value) => {
    if (!value || typeof value !== "string") {
      return { type: "color", value: "#ffffff" }
    }
  
    if (value.includes("gradient")) {
      return { type: "gradient", value }
    } else if (value.includes("url")) {
      return { type: "image", value }
    } else {
      return { type: "color", value }
    }
  }
  
  // Parse rotation
  export const parseRotation = (transform) => {
    if (!transform || typeof transform !== "string") return 0
    const match = transform.match(/rotate$$([^)]+)$$/)
    return match ? Number.parseFloat(match[1]) : 0
  }
  
  // Find a component by ID in the layout
  export const findComponentById = (layout, id) => {
    if (!id) return null
  
    const findInChildren = (children) => {
      for (const child of children || []) {
        if (child.id === id) return child
        if (child.children) {
          const found = findInChildren(child.children)
          if (found) return found
        }
      }
      return null
    }
  
    return findInChildren(layout.children)
  }
  
  // Find all children of a parent
  export const findAllChildren = (components, parentId) => {
    if (!components) return []
    return components.filter((component) => component.parentId === parentId)
  }
  
  
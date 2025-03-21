// Initial layout structure
export const initialLayout = {
  id: "root",
  parentId: null,
  type: "root",
  styles: {
    width: "100%",
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

// List of available components
export const componentsList = [
  // Basic Components
  { id: "button", type: "button", label: "Button" },
  { id: "input", type: "input", label: "Input" },
  { id: "switch", type: "switch", label: "Switch" },
  { id: "container", type: "container", label: "Container" },
  { id: "text", type: "text", label: "Text" },
  { id: "inputnumber", type: "inputnumber", label: "Number Input" },
  { id: "autocomplete", type: "autocomplete", label: "AutoComplete" },

  // Data Entry Components
  { id: "datepicker", type: "datepicker", label: "Date Picker" },
  { id: "timepicker", type: "timepicker", label: "Time Picker" },
  { id: "select", type: "select", label: "Select" },
  { id: "checkbox", type: "checkbox", label: "Checkbox" },
  { id: "radio", type: "radio", label: "Radio" },
  { id: "slider", type: "slider", label: "Slider" },
  { id: "upload", type: "upload", label: "Upload" },
  { id: "rate", type: "rate", label: "Rate" },
  { id: "colorpicker", type: "colorpicker", label: "Color Picker" },
  { id: "mentions", type: "mentions", label: "Mentions" },
  { id: "transfer", type: "transfer", label: "Transfer" },
  { id: "cascader", type: "cascader", label: "Cascader" },
  { id: "treeselect", type: "treeselect", label: "Tree Select" },

  // Data Display Components
  { id: "table", type: "table", label: "Table" },
  { id: "card", type: "card", label: "Card" },
  { id: "tabs", type: "tabs", label: "Tabs" },
  { id: "tooltip", type: "tooltip", label: "Tooltip" },
  { id: "badge", type: "badge", label: "Badge" },
  { id: "avatar", type: "avatar", label: "Avatar" },
  { id: "tag", type: "tag", label: "Tag" },
  { id: "typography", type: "typography", label: "Typography" },
  { id: "title", type: "title", label: "Title" },
  { id: "paragraph", type: "paragraph", label: "Paragraph" },
  { id: "collapse", type: "collapse", label: "Collapse" },
  { id: "timeline", type: "timeline", label: "Timeline" },
  { id: "popover", type: "popover", label: "Popover" },
  { id: "statistic", type: "statistic", label: "Statistic" },
  { id: "calendar", type: "calendar", label: "Calendar" },
  { id: "empty", type: "empty", label: "Empty" },
  { id: "image", type: "image", label: "Image" },
  { id: "list", type: "list", label: "List" },
  { id: "descriptions", type: "descriptions", label: "Descriptions" },
  { id: "tree", type: "tree", label: "Tree" },
  { id: "qrcode", type: "qrcode", label: "QR Code" },
  { id: "segmented", type: "segmented", label: "Segmented" },

  // Feedback Components
  { id: "alert", type: "alert", label: "Alert" },
  { id: "progress", type: "progress", label: "Progress" },
  { id: "skeleton", type: "skeleton", label: "Skeleton" },
  { id: "result", type: "result", label: "Result" },
  { id: "spin", type: "spin", label: "Spin" },
  { id: "drawer", type: "drawer", label: "Drawer" },
  { id: "modal", type: "modal", label: "Modal" },
  { id: "notification", type: "notification", label: "Notification" },
  { id: "message", type: "message", label: "Message" },
  { id: "tour", type: "tour", label: "Tour" },

  // Navigation Components
  { id: "pagination", type: "pagination", label: "Pagination" },
  { id: "breadcrumb", type: "breadcrumb", label: "Breadcrumb" },
  { id: "steps", type: "steps", label: "Steps" },
  { id: "menu", type: "menu", label: "Menu" },
  { id: "dropdown", type: "dropdown", label: "Dropdown" },
  { id: "affix", type: "affix", label: "Affix" },
  { id: "anchor", type: "anchor", label: "Anchor" },
  { id: "backtop", type: "backtop", label: "Back Top" },
  { id: "floatbutton", type: "floatbutton", label: "Float Button" },

  // Layout Components
  { id: "divider", type: "divider", label: "Divider" },
  { id: "space", type: "space", label: "Space" },
  { id: "layout", type: "layout", label: "Layout" },
  { id: "watermark", type: "watermark", label: "Watermark" },

  // Other Components
  { id: "configprovider", type: "configprovider", label: "Config Provider" },
]


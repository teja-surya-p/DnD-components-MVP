"use client"
import { Collapse, InputNumber, Select, ColorPicker, Radio, Slider, Input, Upload, Button } from "antd"
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BorderOutlined,
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  PictureOutlined,
  BorderOuterOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { RotateCw, ImageIcon } from "lucide-react"
import {
  parseCssValue,
  parseCssShorthand,
  parseBorder,
  parseBorderRadius,
  parseBackground,
  parseRotation,
  formatCssValue,
  formatCssShorthand,
  formatBorder,
  formatBorderRadius,
} from "./utils"

const { Panel } = Collapse
const { Option } = Select

const PropertiesPanel = ({ selectedComponent, updateComponentStyles, updateComponentContent }) => {
  if (!selectedComponent) {
    return (
      <div className="properties-panel">
        <div className="panel-header">Properties</div>
        <div className="panel-content">
          <div className="empty-state">
            <ImageIcon size={48} className="empty-icon" />
            <p>Select a component to edit its properties</p>
          </div>
        </div>
      </div>
    )
  }

  const styles = selectedComponent.styles || {}

  // Parse dimensions
  const width = parseCssValue(styles.width)
  const height = parseCssValue(styles.height)

  // Parse padding
  const padding = parseCssShorthand(styles.padding)

  // Parse margin
  const margin = parseCssShorthand(styles.margin)

  // Parse border
  const border = parseBorder(styles.border)

  // Parse border radius
  const borderRadius = parseBorderRadius(styles.borderRadius)

  // Parse background
  const background = parseBackground(styles.background)

  // Parse rotation
  const rotation = parseRotation(styles.transform)

  return (
    <div className="properties-panel">
      <div className="panel-header">Properties</div>
      <div className="panel-content">
        <Collapse defaultActiveKey={["dimensions", "appearance"]} bordered={false}>
          <Panel header="Dimensions" key="dimensions" className="custom-panel">
            <div className="property-group">
              <div className="property-row">
                <div className="property-label">
                  <ColumnWidthOutlined /> Width
                </div>
                <div className="property-input">
                  <InputNumber
                    min={0}
                    max={430}
                    value={width.value}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          width: formatCssValue(value, width.unit),
                        })
                      }
                    }}
                  />
                  <Select
                    value={width.unit}
                    style={{ width: 60 }}
                    onChange={(unit) => {
                      updateComponentStyles(selectedComponent.id, {
                        width: formatCssValue(width.value, unit),
                      })
                    }}
                  >
                    <Option value="px">px</Option>
                    <Option value="%">%</Option>
                    <Option value="em">em</Option>
                    <Option value="rem">rem</Option>
                  </Select>
                </div>
              </div>
              <div className="property-row">
                <div className="property-label">
                  <ColumnHeightOutlined /> Height
                </div>
                <div className="property-input">
                  <InputNumber
                    min={0}
                    value={height.value}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          height: formatCssValue(value, height.unit),
                        })
                      }
                    }}
                  />
                  <Select
                    value={height.unit}
                    style={{ width: 60 }}
                    onChange={(unit) => {
                      updateComponentStyles(selectedComponent.id, {
                        height: formatCssValue(height.value, unit),
                      })
                    }}
                  >
                    <Option value="px">px</Option>
                    <Option value="%">%</Option>
                    <Option value="em">em</Option>
                    <Option value="rem">rem</Option>
                  </Select>
                </div>
              </div>
            </div>
          </Panel>

          <Panel header="Spacing" key="spacing" className="custom-panel">
            <div className="property-group">
              <div className="property-label">Padding</div>
              <div className="property-row four-sides">
                <div className="side-input">
                  <div className="side-label">Top</div>
                  <InputNumber
                    min={0}
                    value={padding.top}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          padding: formatCssShorthand(value, padding.right, padding.bottom, padding.left, padding.unit),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">Right</div>
                  <InputNumber
                    min={0}
                    value={padding.right}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          padding: formatCssShorthand(padding.top, value, padding.bottom, padding.left, padding.unit),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">Bottom</div>
                  <InputNumber
                    min={0}
                    value={padding.bottom}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          padding: formatCssShorthand(padding.top, padding.right, value, padding.left, padding.unit),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">Left</div>
                  <InputNumber
                    min={0}
                    value={padding.left}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          padding: formatCssShorthand(padding.top, padding.right, padding.bottom, value, padding.unit),
                        })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="property-label">Margin</div>
              <div className="property-row four-sides">
                <div className="side-input">
                  <div className="side-label">Top</div>
                  <InputNumber
                    min={0}
                    value={margin.top}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          margin: formatCssShorthand(value, margin.right, margin.bottom, margin.left, margin.unit),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">Right</div>
                  <InputNumber
                    min={0}
                    value={margin.right}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          margin: formatCssShorthand(margin.top, value, margin.bottom, margin.left, margin.unit),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">Bottom</div>
                  <InputNumber
                    min={0}
                    value={margin.bottom}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          margin: formatCssShorthand(margin.top, margin.right, value, margin.left, margin.unit),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">Left</div>
                  <InputNumber
                    min={0}
                    value={margin.left}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          margin: formatCssShorthand(margin.top, margin.right, margin.bottom, value, margin.unit),
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Panel>

          <Panel header="Border" key="border" className="custom-panel">
            <div className="property-group">
              <div className="property-row">
                <div className="property-label">
                  <BorderOutlined /> Width
                </div>
                <div className="property-input">
                  <InputNumber
                    min={0}
                    value={border.width}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          border: formatBorder(value, border.style, border.color, border.unit),
                        })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="property-row">
                <div className="property-label">Style</div>
                <div className="property-input">
                  <Select
                    value={border.style}
                    style={{ width: "100%" }}
                    onChange={(style) => {
                      updateComponentStyles(selectedComponent.id, {
                        border: formatBorder(border.width, style, border.color, border.unit),
                      })
                    }}
                  >
                    <Option value="none">None</Option>
                    <Option value="solid">Solid</Option>
                    <Option value="dashed">Dashed</Option>
                    <Option value="dotted">Dotted</Option>
                    <Option value="double">Double</Option>
                  </Select>
                </div>
              </div>

              <div className="property-row">
                <div className="property-label">Color</div>
                <div className="property-input">
                  <ColorPicker
                    value={border.color}
                    onChange={(color) => {
                      updateComponentStyles(selectedComponent.id, {
                        border: formatBorder(border.width, border.style, color.toHexString(), border.unit),
                      })
                    }}
                  />
                </div>
              </div>

              <div className="property-label">
                <BorderOuterOutlined /> Border Radius
              </div>
              <div className="property-row four-sides">
                <div className="side-input">
                  <div className="side-label">TL</div>
                  <InputNumber
                    min={0}
                    value={borderRadius.top}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          borderRadius: formatBorderRadius(
                            value,
                            borderRadius.right,
                            borderRadius.bottom,
                            borderRadius.left,
                            borderRadius.unit,
                          ),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">TR</div>
                  <InputNumber
                    min={0}
                    value={borderRadius.right}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          borderRadius: formatBorderRadius(
                            borderRadius.top,
                            value,
                            borderRadius.bottom,
                            borderRadius.left,
                            borderRadius.unit,
                          ),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">BR</div>
                  <InputNumber
                    min={0}
                    value={borderRadius.bottom}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          borderRadius: formatBorderRadius(
                            borderRadius.top,
                            borderRadius.right,
                            value,
                            borderRadius.left,
                            borderRadius.unit,
                          ),
                        })
                      }
                    }}
                  />
                </div>
                <div className="side-input">
                  <div className="side-label">BL</div>
                  <InputNumber
                    min={0}
                    value={borderRadius.left}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          borderRadius: formatBorderRadius(
                            borderRadius.top,
                            borderRadius.right,
                            borderRadius.bottom,
                            value,
                            borderRadius.unit,
                          ),
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Panel>

          <Panel header="Appearance" key="appearance" className="custom-panel">
            <div className="property-group">
              <div className="property-row">
                <div className="property-label">
                  <ImageIcon className="ant-icon" /> Background
                </div>
                <div className="property-input">
                  <Radio.Group
                    value={background.type}
                    onChange={(e) => {
                      const type = e.target.value
                      let value = background.value

                      if (type === "color" && background.type !== "color") {
                        value = "#ffffff"
                      } else if (type === "gradient" && background.type !== "gradient") {
                        value = "linear-gradient(to right, #f5f5f5, #e0e0e0)"
                      } else if (type === "image" && background.type !== "image") {
                        value = "url(/placeholder.jpg)"
                      }

                      updateComponentStyles(selectedComponent.id, {
                        background: value,
                      })
                    }}
                  >
                    <Radio.Button value="color">Color</Radio.Button>
                    <Radio.Button value="gradient">Gradient</Radio.Button>
                    <Radio.Button value="image">Image</Radio.Button>
                  </Radio.Group>
                </div>
              </div>

              {background.type === "color" && (
                <div className="property-row">
                  <div className="property-input">
                    <ColorPicker
                      value={background.value}
                      onChange={(color) => {
                        updateComponentStyles(selectedComponent.id, {
                          background: color.toHexString(),
                        })
                      }}
                    />
                  </div>
                </div>
              )}

              {background.type === "gradient" && (
                <div className="property-row">
                  <div className="property-input">
                    <Select
                      value={background.value.includes("linear") ? "linear" : "radial"}
                      style={{ width: "100%", marginBottom: "8px" }}
                      onChange={(type) => {
                        const newValue =
                          type === "linear"
                            ? "linear-gradient(to right, #f5f5f5, #e0e0e0)"
                            : "radial-gradient(circle, #f5f5f5, #e0e0e0)"

                        updateComponentStyles(selectedComponent.id, {
                          background: newValue,
                        })
                      }}
                    >
                      <Option value="linear">Linear</Option>
                      <Option value="radial">Radial</Option>
                    </Select>

                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <div>
                        <div className="side-label">Start Color</div>
                        <ColorPicker
                          value={
                            background.value.includes("linear")
                              ? background.value.match(
                                  /linear-gradient$$to right, (#[a-f0-9]+|rgba?\([^)]+$$), /i,
                                )?.[1] || "#f5f5f5"
                              : background.value.match(
                                  /radial-gradient$$circle, (#[a-f0-9]+|rgba?\([^)]+$$), /i,
                                )?.[1] || "#f5f5f5"
                          }
                          onChange={(color) => {
                            const endColor = background.value.includes("linear")
                              ? background.value.match(/, (#[a-f0-9]+|rgba?$$[^)]+$$)\)/i)?.[1] || "#e0e0e0"
                              : background.value.match(/, (#[a-f0-9]+|rgba?$$[^)]+$$)\)/i)?.[1] || "#e0e0e0"

                            const newValue = background.value.includes("linear")
                              ? `linear-gradient(to right, ${color.toHexString()}, ${endColor})`
                              : `radial-gradient(circle, ${color.toHexString()}, ${endColor})`

                            updateComponentStyles(selectedComponent.id, {
                              background: newValue,
                            })
                          }}
                        />
                      </div>
                      <div>
                        <div className="side-label">End Color</div>
                        <ColorPicker
                          value={
                            background.value.includes("linear")
                              ? background.value.match(/, (#[a-f0-9]+|rgba?$$[^)]+$$)\)/i)?.[1] || "#e0e0e0"
                              : background.value.match(/, (#[a-f0-9]+|rgba?$$[^)]+$$)\)/i)?.[1] || "#e0e0e0"
                          }
                          onChange={(color) => {
                            const startColor = background.value.includes("linear")
                              ? background.value.match(
                                  /linear-gradient$$to right, (#[a-f0-9]+|rgba?\([^)]+$$), /i,
                                )?.[1] || "#f5f5f5"
                              : background.value.match(
                                  /radial-gradient$$circle, (#[a-f0-9]+|rgba?\([^)]+$$), /i,
                                )?.[1] || "#f5f5f5"

                            const newValue = background.value.includes("linear")
                              ? `linear-gradient(to right, ${startColor}, ${color.toHexString()})`
                              : `radial-gradient(circle, ${startColor}, ${color.toHexString()})`

                            updateComponentStyles(selectedComponent.id, {
                              background: newValue,
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {background.type === "image" && (
                <div className="property-row">
                  <div className="property-input">
                    <Input
                      placeholder="Image URL"
                      value={background.value.replace(/url$$['"]?([^'"]+)['"]?$$/, "$1")}
                      onChange={(e) => {
                        updateComponentStyles(selectedComponent.id, {
                          background: `url(${e.target.value})`,
                        })
                      }}
                      addonAfter={<PictureOutlined />}
                    />

                    <div style={{ marginTop: "12px" }}>
                      <Upload
                        name="file"
                        listType="picture"
                        maxCount={1}
                        showUploadList={false}
                        beforeUpload={(file) => {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            if (e.target?.result) {
                              updateComponentStyles(selectedComponent.id, {
                                background: `url(${e.target.result})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                              })
                            }
                          }
                          reader.readAsDataURL(file)
                          return false
                        }}
                      >
                        <Button icon={<UploadOutlined />} style={{ width: "100%" }}>
                          Upload Image
                        </Button>
                      </Upload>
                    </div>

                    <div style={{ marginTop: "12px" }}>
                      <div className="property-label">Background Size</div>
                      <Select
                        defaultValue="cover"
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          updateComponentStyles(selectedComponent.id, {
                            backgroundSize: value,
                          })
                        }}
                      >
                        <Option value="cover">Cover</Option>
                        <Option value="contain">Contain</Option>
                        <Option value="auto">Auto</Option>
                        <Option value="100% 100%">Stretch</Option>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              <div className="property-row">
                <div className="property-label">
                  <RotateCw className="ant-icon" /> Rotation
                </div>
                <div className="property-input">
                  <Slider
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(value) => {
                      updateComponentStyles(selectedComponent.id, {
                        transform: `rotate(${value}deg)`,
                      })
                    }}
                  />
                  <InputNumber
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(value) => {
                      if (value !== null) {
                        updateComponentStyles(selectedComponent.id, {
                          transform: `rotate(${value}deg)`,
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Panel>

          {selectedComponent.type === "text" && (
            <Panel header="Text" key="text" className="custom-panel">
              <div className="property-group">
                <div className="property-row">
                  <div className="property-label">Content</div>
                  <div className="property-input">
                    <Input.TextArea
                      value={selectedComponent.content}
                      onChange={(e) => {
                        updateComponentContent(selectedComponent.id, e.target.value)
                      }}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="property-row">
                  <div className="property-label">Font Size</div>
                  <div className="property-input">
                    <InputNumber
                      min={8}
                      max={72}
                      value={Number.parseInt(styles.fontSize) || 16}
                      onChange={(value) => {
                        if (value !== null) {
                          updateComponentStyles(selectedComponent.id, {
                            fontSize: `${value}px`,
                          })
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="property-row">
                  <div className="property-label">Font Weight</div>
                  <div className="property-input">
                    <Select
                      value={styles.fontWeight || "normal"}
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        updateComponentStyles(selectedComponent.id, {
                          fontWeight: value,
                        })
                      }}
                    >
                      <Option value="normal">Normal</Option>
                      <Option value="bold">Bold</Option>
                      <Option value="lighter">Lighter</Option>
                      <Option value="bolder">Bolder</Option>
                    </Select>
                  </div>
                </div>

                <div className="property-row">
                  <div className="property-label">Text Color</div>
                  <div className="property-input">
                    <ColorPicker
                      value={styles.color || "#000000"}
                      onChange={(color) => {
                        updateComponentStyles(selectedComponent.id, {
                          color: color.toHexString(),
                        })
                      }}
                    />
                  </div>
                </div>

                <div className="property-row">
                  <div className="property-label">Text Align</div>
                  <div className="property-input">
                    <Radio.Group
                      value={styles.textAlign || "left"}
                      onChange={(e) => {
                        updateComponentStyles(selectedComponent.id, {
                          textAlign: e.target.value,
                        })
                      }}
                    >
                      <Radio.Button value="left">
                        <AlignLeftOutlined />
                      </Radio.Button>
                      <Radio.Button value="center">
                        <AlignCenterOutlined />
                      </Radio.Button>
                      <Radio.Button value="right">
                        <AlignRightOutlined />
                      </Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              </div>
            </Panel>
          )}
        </Collapse>
      </div>

      <style jsx>{`
        .properties-panel {
          height: 100%;
          display: flex;
          flex-direction: column;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          background: #fff;
        }
        
        .panel-header {
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
        }
        
        .panel-content {
          padding: 16px;
          flex: 1;
          overflow-y: auto;
        }
        
        .property-group {
          margin-bottom: 16px;
        }
        
        .property-row {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .property-label {
          width: 100px;
          font-size: 14px;
          margin-right: 8px;
          color: #666;
        }
        
        .property-input {
          flex: 1;
          display: flex;
          gap: 8px;
        }
        
        .four-sides {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .side-input {
          flex: 1;
          min-width: 60px;
        }
        
        .side-label {
          font-size: 12px;
          text-align: center;
          margin-bottom: 4px;
          color: #888;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: #999;
          text-align: center;
        }
        
        .empty-icon {
          margin-bottom: 16px;
          color: #ccc;
        }
        
        :global(.custom-panel) {
          background: #fafafa;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        
        :global(.ant-collapse-header) {
          font-weight: 500;
        }
      `}</style>
    </div>
  )
}

export default PropertiesPanel


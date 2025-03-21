"use client"
import {
  Button,
  Input,
  Switch,
  DatePicker,
  Select,
  Checkbox,
  Radio,
  Slider,
  Table,
  Card,
  Tabs,
  Dropdown,
  Menu,
  Form,
  Upload,
  Tooltip,
  Rate,
  Progress,
  Badge,
  Avatar,
  Alert,
  Tag,
  Divider,
  Space,
  Typography,
  Collapse,
  Timeline,
  Popover,
  Statistic,
  Calendar,
  Steps,
  Cascader,
  TreeSelect,
  Mentions,
  Empty,
  Skeleton,
  Result,
  Image,
  List,
  Descriptions,
  ConfigProvider,
  Drawer,
  Affix,
  Anchor,
  BackTop,
  FloatButton,
  QRCode,
  Segmented,
  Tour,
  Watermark,
  ColorPicker,
  InputNumber,
  AutoComplete,
  TimePicker,
  Transfer,
  Tree,
  Pagination,
  Breadcrumb,
  // PageHeader,
  Layout,
  Spin,
} from "antd"
import { PlusOutlined, UploadOutlined, UserOutlined } from "@ant-design/icons"

// Wrapper components
const RewardsyButton = (props) => <Button {...props} />
const RewardsyInput = (props) => <Input {...props} />
const RewardsySwitch = (props) => <Switch {...props} />
const RewardsyDatePicker = (props) => <DatePicker {...props} />
const RewardsySelect = (props) => <Select {...props} />
const RewardsyCheckbox = (props) => <Checkbox {...props} />
const RewardsyRadio = (props) => <Radio {...props} />
const RewardsySlider = (props) => <Slider {...props} />
const RewardsyTable = (props) => <Table {...props} />
const RewardsyCard = (props) => <Card {...props} />
const RewardsyTabs = (props) => <Tabs {...props} />
const RewardsyDropdown = (props) => <Dropdown {...props} />
const RewardsyMenu = (props) => <Menu {...props} />
const RewardsyForm = (props) => <Form {...props} />
const RewardsyUpload = (props) => <Upload {...props} />
const RewardsyTooltip = (props) => <Tooltip {...props} />
const RewardsyRate = (props) => <Rate {...props} />
const RewardsyProgress = (props) => <Progress {...props} />
const RewardsyBadge = (props) => <Badge {...props} />
const RewardsyAvatar = (props) => <Avatar {...props} />
const RewardsyAlert = (props) => <Alert {...props} />
const RewardsyTag = (props) => <Tag {...props} />
const RewardsyDivider = (props) => <Divider {...props} />
const RewardsySpace = (props) => <Space {...props} />
const RewardsyTypography = (props) => <Typography.Text {...props} />
const RewardsyTitle = (props) => <Typography.Title {...props} />
const RewardsyParagraph = (props) => <Typography.Paragraph {...props} />
const RewardsyCollapse = (props) => <Collapse {...props} />
const RewardsyTimeline = (props) => <Timeline {...props} />
const RewardsyPopover = (props) => <Popover {...props} />
const RewardsyStatistic = (props) => <Statistic {...props} />
const RewardsyCalendar = (props) => <Calendar {...props} />
const RewardsySteps = (props) => <Steps {...props} />
const RewardsyCascader = (props) => <Cascader {...props} />
const RewardsyTreeSelect = (props) => <TreeSelect {...props} />
const RewardsyMentions = (props) => <Mentions {...props} />
const RewardsyEmpty = (props) => <Empty {...props} />
const RewardsySkeleton = (props) => <Skeleton {...props} />
const RewardsyResult = (props) => <Result {...props} />
const RewardsyImage = (props) => <Image {...props} />
const RewardsyList = (props) => <List {...props} />
const RewardsyDescriptions = (props) => <Descriptions {...props} />
const RewardsyConfigProvider = (props) => <ConfigProvider {...props} />
const RewardsyDrawer = (props) => <Drawer {...props} />
const RewardsyAffix = (props) => <Affix {...props} />
const RewardsyAnchor = (props) => <Anchor {...props} />
const RewardsyBackTop = (props) => <BackTop {...props} />
const RewardsyFloatButton = (props) => <FloatButton {...props} />
const RewardsyQRCode = (props) => <QRCode {...props} />
const RewardsySegmented = (props) => <Segmented {...props} />
const RewardsyTour = (props) => <Tour {...props} />
const RewardsyWatermark = (props) => <Watermark {...props} />
const RewardsyColorPicker = (props) => <ColorPicker {...props} />
const RewardsyInputNumber = (props) => <InputNumber {...props} />
const RewardsyAutoComplete = (props) => <AutoComplete {...props} />
const RewardsyTimePicker = (props) => <TimePicker {...props} />
const RewardsyTransfer = (props) => <Transfer {...props} />
const RewardsyTree = (props) => <Tree {...props} />
const RewardsyPagination = (props) => <Pagination {...props} />
const RewardsyBreadcrumb = (props) => <Breadcrumb {...props} />
// const RewardsyPageHeader = (props) => <PageHeader {...props} />
const RewardsyLayout = (props) => <Layout {...props} />
const RewardsySpin = (props) => <Spin {...props} />

const ComponentsPanel = ({ componentsList, addPage }) => {
  // Group components by category for better organization
  const groupedComponents = {
    Basic: componentsList.filter((comp) =>
      ["button", "input", "switch", "text", "container", "inputnumber", "autocomplete"].includes(comp.type),
    ),
    "Data Entry": componentsList.filter((comp) =>
      [
        "datepicker",
        "select",
        "checkbox",
        "radio",
        "slider",
        "upload",
        "rate",
        "timepicker",
        "colorpicker",
        "mentions",
        "transfer",
      ].includes(comp.type),
    ),
    "Data Display": componentsList.filter((comp) =>
      [
        "table",
        "card",
        "tabs",
        "tooltip",
        "badge",
        "avatar",
        "tag",
        "typography",
        "title",
        "paragraph",
        "collapse",
        "timeline",
        "popover",
        "statistic",
        "calendar",
        "empty",
        "image",
        "qrcode",
        "segmented",
      ].includes(comp.type),
    ),
    Feedback: componentsList.filter((comp) => ["alert", "progress", "skeleton", "result", "spin"].includes(comp.type)),
    Navigation: componentsList.filter((comp) =>
      ["pagination", "breadcrumb", "steps", "affix", "anchor", "backtop", "floatbutton"].includes(comp.type),
    ),
    Layout: componentsList.filter((comp) => ["divider", "space", "watermark"].includes(comp.type)),
  }

  return (
    <div className="components-panel">
      <div className="panel-header">
        <h3>Components</h3>
      </div>
      <div className="panel-content">
        {Object.entries(groupedComponents).map(([category, components]) => (
          <div key={category} className="component-category">
            <h4 className="category-title">{category}</h4>
            <div className="category-items">
              {components.map((component) => (
                <div
                  key={component.id}
                  className="draggable"
                  data-type={component.type}
                  style={{
                    padding: "10px",
                    margin: "5px 0",
                    border: "1px solid #eaeaea",
                    borderRadius: "6px",
                    cursor: "grab",
                    background: "#fff",
                    touchAction: "none",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {component.type === "button" && <RewardsyButton>{component.label}</RewardsyButton>}
                  {component.type === "input" && <RewardsyInput placeholder={component.label} />}
                  {component.type === "switch" && <RewardsySwitch />}
                  {component.type === "container" && (
                    <div style={{ padding: "10px", border: "1px dashed #ccc", borderRadius: "4px" }}>
                      {component.label}
                    </div>
                  )}
                  {component.type === "text" && <div>{component.label}</div>}
                  {component.type === "datepicker" && <RewardsyDatePicker style={{ width: "100%" }} />}
                  {component.type === "select" && (
                    <RewardsySelect placeholder={component.label} style={{ width: "100%" }} />
                  )}
                  {component.type === "checkbox" && <RewardsyCheckbox>{component.label}</RewardsyCheckbox>}
                  {component.type === "radio" && <RewardsyRadio>{component.label}</RewardsyRadio>}
                  {component.type === "slider" && <RewardsySlider style={{ width: "100%" }} />}
                  {component.type === "card" && (
                    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
                      {component.label}
                    </div>
                  )}
                  {component.type === "tabs" && (
                    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}>
                      {component.label}
                    </div>
                  )}
                  {component.type === "upload" && (
                    <RewardsyButton icon={<UploadOutlined />}>{component.label}</RewardsyButton>
                  )}
                  {component.type === "tooltip" && <RewardsyButton>{component.label}</RewardsyButton>}
                  {component.type === "rate" && <RewardsyRate defaultValue={3} />}
                  {component.type === "progress" && <RewardsyProgress percent={50} style={{ width: "100%" }} />}
                  {component.type === "badge" && (
                    <RewardsyBadge count={5}>
                      <div style={{ width: "30px", height: "30px", background: "#f0f0f0", borderRadius: "4px" }}></div>
                    </RewardsyBadge>
                  )}
                  {component.type === "avatar" && <RewardsyAvatar icon={<UserOutlined />} />}
                  {component.type === "alert" && (
                    <div
                      style={{
                        padding: "5px",
                        border: "1px solid #91caff",
                        borderRadius: "4px",
                        background: "#e6f4ff",
                        color: "#1677ff",
                      }}
                    >
                      {component.label}
                    </div>
                  )}
                  {component.type === "tag" && <RewardsyTag color="blue">{component.label}</RewardsyTag>}
                  {component.type === "divider" && (
                    <div style={{ textAlign: "center", borderBottom: "1px solid #f0f0f0", margin: "10px 0" }}>
                      {component.label}
                    </div>
                  )}
                  {component.type === "typography" && <div>{component.label}</div>}
                  {component.type === "title" && <div style={{ fontWeight: "bold" }}>{component.label}</div>}
                  {component.type === "paragraph" && <div>{component.label}</div>}
                  {component.type === "collapse" && (
                    <div style={{ padding: "5px", border: "1px solid #d9d9d9", borderRadius: "4px" }}>
                      {component.label}
                    </div>
                  )}
                  {component.type === "timeline" && <div style={{ padding: "5px" }}>{component.label}</div>}
                  {component.type === "popover" && <RewardsyButton>{component.label}</RewardsyButton>}
                  {component.type === "statistic" && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "24px" }}>93</div>
                      <div>{component.label}</div>
                    </div>
                  )}
                  {component.type === "empty" && (
                    <div style={{ textAlign: "center", padding: "20px" }}>{component.label}</div>
                  )}
                  {component.type === "skeleton" && (
                    <div style={{ padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}></div>
                  )}
                  {component.type === "inputnumber" && <RewardsyInputNumber min={1} max={10} defaultValue={3} />}
                  {component.type === "autocomplete" && <RewardsyInput placeholder={component.label} />}
                  {component.type === "timepicker" && (
                    <div style={{ padding: "5px", border: "1px solid #d9d9d9", borderRadius: "4px" }}>
                      {component.label}
                    </div>
                  )}
                  {component.type === "pagination" && (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          background: "#1677ff",
                          color: "white",
                          borderRadius: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        1
                      </div>
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          background: "#f0f0f0",
                          borderRadius: "2px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        2
                      </div>
                    </div>
                  )}
                  {component.type === "spin" && <div style={{ textAlign: "center" }}>{component.label}</div>}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add Page Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            marginTop: "20px",
            width: "100%",
            borderRadius: "6px",
          }}
          onClick={addPage}
        >
          Add Page
        </Button>
      </div>

      <style jsx>{`
        .components-panel {
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
          border-bottom: 1px solid #f0f0f0;
          background: #fafafa;
        }
        
        .panel-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }
        
        .panel-content {
          padding: 16px;
          flex: 1;
          overflow-y: auto;
        }
        
        .draggable:hover {
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }

        .component-category {
          margin-bottom: 20px;
        }

        .category-title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
          color: #666;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 5px;
        }

        .category-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 10px;
        }
      `}</style>
    </div>
  )
}

export default ComponentsPanel


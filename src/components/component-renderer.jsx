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
  Modal,
} from "antd"
import { UploadOutlined, UserOutlined } from "@ant-design/icons"
import { findAllChildren } from "./utils"

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
const RewardsyModal = (props) => <Modal {...props} />

const ComponentRenderer = ({
  components,
  parentId,
  activePage,
  lastInteractedId,
  setLastInteractedId,
  deleteComponent,
  renderComponents,
}) => {
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
    switch (child.type) {
      case "button":
        content = (
          <RewardsyButton
            style={{
              width: child.styles.width ? child.styles.width : "auto",
              height: child.styles.height ? child.styles.height : "auto",
            }}
          >
            {child.label}
          </RewardsyButton>
        )
        break
      case "input":
        content = (
          <RewardsyInput
            placeholder={child.label}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
              height: child.styles.height ? child.styles.height : "auto",
            }}
          />
        )
        break
      case "switch":
        content = (
          <div
            style={{
              width: child.styles.width ? child.styles.width : "auto",
              height: child.styles.height ? child.styles.height : "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RewardsySwitch
              style={{
                transform: child.styles.width
                  ? `scale(${Math.min(Number.parseFloat(child.styles.width) / 50, 2)})`
                  : "none",
              }}
            />
          </div>
        )
        break
      case "text":
        content = (
          <div
            style={{
              width: child.styles.width ? child.styles.width : "auto",
              height: child.styles.height ? child.styles.height : "auto",
              fontSize: child.styles.fontSize,
              fontWeight: child.styles.fontWeight,
              color: child.styles.color,
              textAlign: child.styles.textAlign,
            }}
          >
            {child.content || child.label}
          </div>
        )
        break
      case "container":
        content = (
          <>
            <div className="container-label">
              {/* {child.label} */}
              </div>
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
          </>
        )
        break
      case "datepicker":
        content = (
          <RewardsyDatePicker
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "select":
        content = (
          <RewardsySelect
            placeholder={child.label}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
            options={[
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
            ]}
          />
        )
        break
      case "checkbox":
        content = (
          <RewardsyCheckbox
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          >
            {child.label}
          </RewardsyCheckbox>
        )
        break
      case "radio":
        content = (
          <RewardsyRadio
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          >
            {child.label}
          </RewardsyRadio>
        )
        break
      case "slider":
        content = (
          <RewardsySlider
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "card":
        content = (
          <RewardsyCard
            title={child.label}
            style={{
              width: child.styles.width ? child.styles.width : "300px",
            }}
          >
            <p>Card content</p>
          </RewardsyCard>
        )
        break
      case "tabs":
        content = (
          <RewardsyTabs
            items={[
              { key: "1", label: "Tab 1", children: "Content of Tab 1" },
              { key: "2", label: "Tab 2", children: "Content of Tab 2" },
            ]}
            style={{
              width: child.styles.width ? child.styles.width : "300px",
            }}
          />
        )
        break
      case "upload":
        content = (
          <RewardsyUpload>
            <RewardsyButton icon={<UploadOutlined />}>{child.label || "Upload"}</RewardsyButton>
          </RewardsyUpload>
        )
        break
      case "tooltip":
        content = (
          <RewardsyTooltip title={child.content || "Tooltip content"}>
            <RewardsyButton>{child.label || "Hover me"}</RewardsyButton>
          </RewardsyTooltip>
        )
        break
      case "rate":
        content = (
          <RewardsyRate
            defaultValue={3}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "progress":
        content = (
          <RewardsyProgress
            percent={50}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "badge":
        content = (
          <RewardsyBadge count={5}>
            <div
              style={{
                width: "30px",
                height: "30px",
                background: "#f0f0f0",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {child.label || "Item"}
            </div>
          </RewardsyBadge>
        )
        break
      case "avatar":
        content = <RewardsyAvatar icon={<UserOutlined />} />
        break
      case "alert":
        content = (
          <RewardsyAlert
            message={child.label || "Alert Title"}
            description={child.content || "Alert Description"}
            type="info"
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "tag":
        content = <RewardsyTag color="blue">{child.label || "Tag"}</RewardsyTag>
        break
      case "divider":
        content = <RewardsyDivider>{child.label}</RewardsyDivider>
        break
      case "typography":
        content = (
          <RewardsyTypography
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          >
            {child.content || child.label || "Text"}
          </RewardsyTypography>
        )
        break
      case "title":
        content = <RewardsyTitle level={child.level || 1}>{child.content || child.label || "Title"}</RewardsyTitle>
        break
      case "paragraph":
        content = (
          <RewardsyParagraph
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          >
            {child.content || child.label || "Paragraph text"}
          </RewardsyParagraph>
        )
        break
      case "collapse":
        content = (
          <RewardsyCollapse
            items={[
              {
                key: "1",
                label: child.label || "Collapse Panel",
                children: <p>{child.content || "Collapse content"}</p>,
              },
            ]}
            style={{
              width: child.styles.width ? child.styles.width : "300px",
            }}
          />
        )
        break
      case "timeline":
        content = (
          <RewardsyTimeline
            items={[{ children: "Event 1" }, { children: "Event 2" }, { children: "Event 3" }]}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "popover":
        content = (
          <RewardsyPopover content={child.content || "Popover content"} title={child.label || "Popover title"}>
            <RewardsyButton>Click me</RewardsyButton>
          </RewardsyPopover>
        )
        break
      case "statistic":
        content = (
          <RewardsyStatistic
            title={child.label || "Statistic"}
            value={child.value || 93}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "steps":
        content = (
          <RewardsySteps
            current={1}
            items={[
              { title: "Step 1", description: "Description 1" },
              { title: "Step 2", description: "Description 2" },
              { title: "Step 3", description: "Description 3" },
            ]}
            style={{
              width: child.styles.width ? child.styles.width : "300px",
            }}
          />
        )
        break
      case "empty":
        content = (
          <RewardsyEmpty
            description={child.label || "No Data"}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "skeleton":
        content = (
          <RewardsySkeleton
            active
            style={{
              width: child.styles.width ? child.styles.width : "300px",
            }}
          />
        )
        break
      case "result":
        content = (
          <RewardsyResult
            status="success"
            title={child.label || "Success"}
            subTitle={child.content || "Operation completed successfully"}
            style={{
              width: child.styles.width ? child.styles.width : "300px",
            }}
          />
        )
        break
      case "image":
        content = (
          <RewardsyImage
            width={child.styles.width ? Number.parseInt(child.styles.width) : 200}
            src="https://via.placeholder.com/200"
            alt={child.label || "Image"}
          />
        )
        break
      case "inputnumber":
        content = (
          <RewardsyInputNumber
            min={1}
            max={10}
            defaultValue={3}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "autocomplete":
        content = (
          <RewardsyAutoComplete
            placeholder={child.label || "Type here"}
            options={[{ value: "option1" }, { value: "option2" }]}
            style={{
              width: child.styles.width ? child.styles.width : "200px",
            }}
          />
        )
        break
      case "timepicker":
        content = (
          <RewardsyTimePicker
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "pagination":
        content = (
          <RewardsyPagination
            defaultCurrent={1}
            total={50}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      case "spin":
        content = (
          <RewardsySpin
            tip={child.label || "Loading..."}
            style={{
              width: child.styles.width ? child.styles.width : "auto",
            }}
          />
        )
        break
      default:
        content = <div>{child.label}</div>
    }

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

export default ComponentRenderer


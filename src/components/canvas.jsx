"use client"
import { Tabs } from "antd"
import ComponentRenderer from "./component-renderer"

const Canvas = ({
  activePage,
  setActivePage,
  pages,
  getActivePage,
  droppableRef,
  alignmentGuides,
  layout,
  lastInteractedId,
  setLastInteractedId,
  deleteComponent,
  renderComponents,
}) => {
  return (
    <div className="canvas">
      <Tabs
        activeKey={activePage}
        onChange={setActivePage}
        type="card"
        items={pages.map((pageId) => ({
          key: pageId,
          label: pageId.replace("-", " ").toUpperCase(),
        }))}
      />

      <div
        className="droppable"
        data-id={activePage}
        style={{
          ...(getActivePage()?.styles || {}),
          height: "calc(100% - 46px)",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          position: "relative",
          overflow: "auto",
        }}
        ref={droppableRef}
      >
        {getActivePage() && (
          <ComponentRenderer
            components={getActivePage().children}
            parentId={activePage}
            activePage={activePage}
            lastInteractedId={lastInteractedId}
            setLastInteractedId={setLastInteractedId}
            deleteComponent={deleteComponent}
            renderComponents={renderComponents}
          />
        )}

        {/* Alignment guides */}
        {alignmentGuides.center && <div className="alignment-guide center-guide"></div>}
        {alignmentGuides.horizontal && <div className="alignment-guide horizontal-guide"></div>}
        {alignmentGuides.vertical && <div className="alignment-guide vertical-guide"></div>}
      </div>

      {/* JSON Preview */}
      <div className="json-preview">
        <h3>JSON Preview</h3>
        <pre>{getActivePage() ? JSON.stringify(getActivePage(), null, 2) : "No active page"}</pre>
      </div>

      <style jsx>{`
        .canvas {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .json-preview {
          margin-top: 16px;
          border: 1px solid #f0f0f0;
          border-radius: 8px;
          padding: 12px;
          height: 200px;
          overflow-y: auto;
          background: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .json-preview h3 {
          margin-top: 0;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .json-preview pre {
          font-size: 12px;
          margin: 0;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  )
}

export default Canvas


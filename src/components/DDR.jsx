import { useRef, useEffect } from "react";

const useDraggable = (ref) => {
  useEffect(() => {
    const element = ref.current;
    let offsetX = 0,
      offsetY = 0;

    const onMouseDown = (event) => {
      offsetX = event.clientX - element.getBoundingClientRect().left;
      offsetY = event.clientY - element.getBoundingClientRect().top;
      document.addEventListener("pointermove", onMouseMove);
      document.addEventListener("pointerup", onMouseUp);
    };

    const onMouseMove = (event) => {
      element.style.left = `${event.clientX - offsetX}px`;
      element.style.top = `${event.clientY - offsetY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("pointermove", onMouseMove);
      document.removeEventListener("pointerup", onMouseUp);
    };

    element.style.position = "absolute";
    element.addEventListener("pointerdown", onMouseDown);

    return () => {
      element.removeEventListener("pointerdown", onMouseDown);
    };
  }, [ref]);
};

const useDroppable = (ref, setDroppedElement) => {
  useEffect(() => {
    const element = ref.current;

    const onDrop = (event) => {
      const draggedElement = document.querySelector(".dragging");
      if (draggedElement) {
        setDroppedElement(draggedElement);
        draggedElement.style.position = "relative";
        draggedElement.classList.remove("dragging");
      }
    };

    element.addEventListener("pointerup", onDrop);
    return () => {
      element.removeEventListener("pointerup", onDrop);
    };
  }, [ref, setDroppedElement]);
};

const useResizable = (ref) => {
  useEffect(() => {
    const element = ref.current;
    const resizeHandle = document.createElement("div");
    resizeHandle.style.width = "10px";
    resizeHandle.style.height = "10px";
    resizeHandle.style.background = "red";
    resizeHandle.style.position = "absolute";
    resizeHandle.style.bottom = "0";
    resizeHandle.style.right = "0";
    resizeHandle.style.cursor = "nwse-resize";
    element.appendChild(resizeHandle);

    const onResizeMove = (event) => {
      element.style.width = `${
        event.clientX - element.getBoundingClientRect().left
      }px`;
      element.style.height = `${
        event.clientY - element.getBoundingClientRect().top
      }px`;
    };

    const onResizeStart = (event) => {
      event.stopPropagation();
      document.addEventListener("pointermove", onResizeMove);
      document.addEventListener("pointerup", onResizeEnd);
    };

    const onResizeEnd = () => {
      document.removeEventListener("pointermove", onResizeMove);
      document.removeEventListener("pointerup", onResizeEnd);
    };

    resizeHandle.addEventListener("pointerdown", onResizeStart);

    return () => {
      resizeHandle.removeEventListener("pointerdown", onResizeStart);
    };
  }, [ref]);
};

const DragDropResizeComponent = () => {
  const dragRef = useRef(null);
  const dropRef = useRef(null);
  const resizeRef = useRef(null);

  useDraggable(dragRef);
  useDroppable(dropRef, () => {});
  useResizable(resizeRef);

  return (
    <div>
      <div
        ref={dragRef}
        className="draggable"
        style={{ width: "100px", height: "100px", background: "yellow" }}
      >
        Drag Me
      </div>
      <div
        ref={dropRef}
        className="droppable"
        style={{
          width: "200px",
          height: "200px",
          background: "lightgray",
          marginTop: "20px",
        }}
      >
        Drop Here
      </div>
      <div
        ref={resizeRef}
        className="resizable draggable"
        style={{
          width: "150px",
          height: "150px",
          background: "green",
          marginTop: "20px",
        }}
      >
        Resize Me
      </div>
    </div>
  );
};

export default DragDropResizeComponent;

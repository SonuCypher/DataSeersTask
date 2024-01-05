import React from "react";
import { Draggable } from "react-beautiful-dnd";

function TaskItems({ element, indexNum }) {
  return (
    <Draggable key={element.id} index={indexNum} draggableId={element.id}>
      {(provided,snapshot) => {
        return (
          <div
            className={`item ${snapshot.isDragging && "dragging"}`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {element.name}
          </div>
        );
      }}
    </Draggable>
  );
}

export default TaskItems;

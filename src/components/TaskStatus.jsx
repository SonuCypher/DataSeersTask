import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import TaskItems from './TaskItems';

function TaskStatus({state , property}) {
    return (
        <div key={property} className={"column"}>
              <h3>{state[property].title}</h3>
              <Droppable droppableId={property}>
              {(provided)=>{
                return(
                  <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={"droppable-col"}
                  >
                   {state[property].items.map((el, index) => {
                    return <TaskItems element={el} indexNum = {index} />
                   })} 
                   {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
            </div>
    )
}

export default TaskStatus

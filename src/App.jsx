import './App.css';
import {useState} from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {v4} from 'uuid';
import TaskStatus from './components/TaskStatus';

// const uid = v4()
// console.log(uid)
const item1 = {
  id:v4(),
  name:"Clean the house"
}
const item2 = {
  id:v4(),
  name:"wash  car"
}
function App() {
  const [state,setState]= useState({
    "added":{
      title:"Added",
      items:[item1]
    },
    "started":{
      title:"Started",
      items:[item2]
    },
    "completed":{
      title:"Completed",
      items:[]
    }
  })

  return (
    <div className="App">
     <DragDropContext onDragEnd={e => console.log(e)}>
      {
        Object.keys(state).map(key => {
          return <TaskStatus state={state} property={key} />
        })
      }
     </DragDropContext>
    </div>
  );
}

export default App;


// Object.keys(state).map(keys => <div keys={keys}>{keys}</div>)


{/* <div key={key} className={"column"}>
              <h3>{state[key].title}</h3>
              <Droppable droppableId={key}>
              {(provided)=>{
                return(
                  <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={"droppable-col"}
                  >
                   {state[key].items.map((el, index) => {
                    return(
                      <Draggable key={el.id} index={index} draggableId={el.id}>
                        {(provided)=>{
                          return(
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                  {el.name}
                            </div>
                          )
                        }}
                      </Draggable>
                    )
                   })} 
                  </div>
                )
              }}
            </Droppable>
            </div> */}
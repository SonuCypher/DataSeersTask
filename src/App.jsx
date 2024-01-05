import "./App.css";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 } from "uuid";
import TaskStatus from "./components/TaskStatus";

function App() {
  const [text, setText] = useState();
  const [state, setState] = useState({
    added: {
      title: "Added",
      items: [],
    },
    started: {
      title: "Started",
      items: [],
    },
    completed: {
      title: "Completed",
      items: [],
    },
  });

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setState((prevState) => ({
        ...prevState,
        ...JSON.parse(storedTasks),
      }));
    }
  }, []);

  // Save tasks to local storage on state change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  // Handle for Dragend events
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      console.log("not dropped in droppable");
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      console.log("dropped in same place");
      return;
    }

    // Creating a copy of the item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] };
    setState((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      localStorage.setItem("tasks", JSON.stringify(state));
      return prev;
    });
  };
  // HANDLE for adding items
  const addItem = () => {
    text && setState((prev) => {
      return {
        ...prev,
        added: {
          title: "Added",
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.added.items,
          ],
        },
      };
    });
    localStorage.setItem("tasks", JSON.stringify(state));
    setText("");
  };

  const clearItems = () => {
    setState((prev) => {
      return {
        ...prev,
        completed: {
          title: "Completed",
          items: [],
        },
      };
    });
    localStorage.removeItem("tasks");
  }

  return (
    <div className="App">
      <div className="form">
        <input className="inputText"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="inputButton" onClick={addItem}>Add</button>
        <button className="inputButton" onClick={clearItems}>clear</button>
      </div>
      <div className="draggable">
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.keys(state).map((key) => {
            return <TaskStatus state={state} property={key} key={key} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;

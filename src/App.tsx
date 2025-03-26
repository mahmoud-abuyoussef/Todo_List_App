import { useState } from "react";
import Task from "./components/Task";
import { toast } from "react-toastify";
import TaskForm from "./components/TaskForm";
import Header from "./components/layouts/Header";
import { TasksContext } from "./context/tasksContext";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));

  const [filter, setFilter] = useState("");

  const completedTasks = tasks.filter((task: { isCompleted: boolean }) => task.isCompleted);

  const nonCompletedTasks = tasks.filter((task: { isCompleted: boolean }) => !task.isCompleted);

  let tasksRenderd = tasks;

  function showToast(message: string) {
    return toast.success(`Get ${message} Tasks Success`);
  }

  switch (filter) {
    case "completed":
      tasksRenderd = completedTasks;
      showToast(filter);
      break;
    case "non-completed":
      tasksRenderd = nonCompletedTasks;
      showToast(filter);
      break;
    default:
      tasksRenderd = tasks;
      showToast(filter);
  }

  return (
    <>
      <Header />

      <TasksContext.Provider value={{ tasks, setTasks }}>
        <TaskForm tasks={tasks} setTasks={setTasks} />

        <div className="container flex justify-center gap-5 mt-5 m-auto">
          <button className="cursor-pointer bg-green-700 text-white p-2 rounded w-50" onClick={() => setFilter("all")}>
            All
          </button>

          <button className="cursor-pointer bg-green-700 text-white p-2 rounded w-50" onClick={() => setFilter("completed")}>
            Completed
          </button>

          <button className="cursor-pointer bg-green-700 text-white p-2 rounded w-50" onClick={() => setFilter("non-completed")}>
            Not Completed
          </button>
        </div>

        <div className="p-5 container m-auto">
          {tasksRenderd?.map((task: { id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string }) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>
      </TasksContext.Provider>
    </>
  );
}

export default App;

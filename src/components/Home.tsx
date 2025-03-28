import Task from "./Task";
import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { TasksContext } from "../context/tasksContext";

export default function Home({ database, setDatabase }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      navigate("/signup");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks") || "[]"));

  const [filter, setFilter] = useState("");

  const completedTasks = tasks.filter((task: { isCompleted: boolean }) => task.isCompleted);

  const nonCompletedTasks = tasks.filter((task: { isCompleted: boolean }) => !task.isCompleted);

  let tasksRenderd = tasks;

  function showToast(message: string) {
    return toast.success(`${message}`);
  }

  switch (filter) {
    case "completed":
      tasksRenderd = completedTasks;
      showToast("Get Tasks completed Success");
      break;
    case "non-completed":
      tasksRenderd = nonCompletedTasks;
      showToast("Get Tasks non-completed Success");
      break;
    default:
      tasksRenderd = tasks;
      showToast("Get All Tasks Success");
  }
  return (
    <TasksContext.Provider value={{ database, setDatabase, showToast }}>
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
  );
}

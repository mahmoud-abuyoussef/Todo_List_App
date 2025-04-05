import Task from "../ui/Task";
import { useEffect, useState } from "react";
import TaskForm from "../ui/TaskForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { TasksContext } from "../../context/tasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}

interface User {
  id: string;
  email: string;
  password: string;
  tasks: Task[];
}

export default function Home({ database, setDatabase }: { database: User[]; setDatabase: (newDatabase: User[]) => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId") === null) {
      navigate("/signup");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const userTasks = database.find((user) => user.id === localStorage.getItem("userId"));
  const [tasks, setTasks] = useState<Task[]>(userTasks?.tasks || []);

  const [filter, setFilter] = useState("");

  const completedTasks = tasks?.filter((task: { isCompleted: boolean }) => task.isCompleted);

  const nonCompletedTasks = tasks?.filter((task: { isCompleted: boolean }) => !task.isCompleted);

  let tasksRenderd = tasks;

  switch (filter) {
    case "completed":
      tasksRenderd = completedTasks;
      break;
    case "non-completed":
      tasksRenderd = nonCompletedTasks;
      break;
    default:
      tasksRenderd = tasks;
  }

  return (
    <TasksContext.Provider value={{ tasks, setTasks, database, setDatabase }}>
      <TaskForm />

      <div className="container flex justify-center gap-5 mt-5 m-auto">
        <button
          className="cursor-pointer bg-green-700 text-white p-2 rounded w-50"
          onClick={() => {
            setFilter("all");
            toast.success("Get All Tasks Success");
          }}
        >
          All
        </button>

        <button
          className="cursor-pointer bg-green-700 text-white p-2 rounded w-50"
          onClick={() => {
            setFilter("completed");
            toast.success("Get Tasks completed Success");
          }}
        >
          Completed
        </button>

        <button
          className="cursor-pointer bg-green-700 text-white p-2 rounded w-50"
          onClick={() => {
            setFilter("non-completed");
            toast.success("Get Tasks non-completed Success");
          }}
        >
          Not Completed
        </button>
      </div>

      <div className="p-5 container m-auto">
        {tasksRenderd?.map((task: Task) => {
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </TasksContext.Provider>
  );
}

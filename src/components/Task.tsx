import { FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaTrashCan } from "react-icons/fa6";
import { useContext, useState } from "react";
import UpdateTaskModal from "./UpdateTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { TasksContext } from "../context/tasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}

export default function Task({ task }: { task: Task }) {
  const { tasks, setTasks, showToast, database, setDatabase } = useContext(TasksContext);

  function handelCheckCompleteTask(id: string) {
    const updatedTasks = tasks.map((task: { id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string }) => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    });

    setTasks(updatedTasks);

    const updatedDatabase = database.map((user) => {
      if (user.id === localStorage.getItem("userId")) {
        user.tasks = updatedTasks;
      }
      return user;
    });

    setDatabase(updatedDatabase);

    localStorage.setItem("database", JSON.stringify(updatedDatabase));

    if (task.isCompleted) {
      showToast("Task Complete");
    } else {
      showToast("Task Uncomplete");
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <section className={`${task.isCompleted ? "bg-green-700" : "bg-blue-500"} text-white font-bold mb-5 rounded p-5`}>
      <div className="container m-auto flex justify-between items-center">
        <div>
          <h3>{task.title}</h3>
          <p> {task.description}</p>
          <p>{task.dateAndTime}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => handelCheckCompleteTask(task.id)} className="bg-green-500 cursor-pointer hover:bg-green-800 rounded-[15px] w-[30px] h-[30px] flex items-center justify-center">
            <FaCheck />
          </button>

          <button onClick={() => setIsOpen((status) => !status)} className="bg-green-500 cursor-pointer hover:bg-green-800 rounded-[15px] w-[30px] h-[30px] flex items-center justify-center">
            <FaPencil />
          </button>

          <button onClick={() => setIsDeleteOpen(true)} className="bg-red-500 cursor-pointer hover:bg-red-800 rounded-[15px] w-[30px] h-[30px] flex items-center justify-center">
            <FaTrashCan />
          </button>
        </div>
      </div>

      {isDeleteOpen && <DeleteTaskModal taskId={task.id} setIsDeleteOpen={setIsDeleteOpen} />}
      {isOpen && <UpdateTaskModal task={task} setIsOpen={setIsOpen} />}
    </section>
  );
}

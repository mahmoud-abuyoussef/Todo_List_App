import { useContext } from "react";
import { toast } from "react-toastify";
import { TasksContext } from "../../context/tasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}
export default function DeleteTaskModal({ taskId, setIsDeleteOpen }: { taskId: string; setIsDeleteOpen: (isDeleteOpen: boolean) => void }) {
  const { tasks, setTasks, database, setDatabase } = useContext(TasksContext);

  function handelDeleteTask(taskId: string) {
    const updatedTasks = tasks.filter((task: Task) => task.id !== taskId);
    setTasks(updatedTasks);

    const updatedDatabase = database.map((user) => {
      if (user.id === localStorage.getItem("userId")) {
        user.tasks = updatedTasks;
      }
      return user;
    });

    setDatabase(updatedDatabase);

    localStorage.setItem("database", JSON.stringify(updatedDatabase));

    toast.success("Task Delete Success");
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000]/75 flex flex-col justify-center items-center">
      <p>Are you Sure to Delete This Task </p>

      <div className="flex gap-2 mt-5">
        <button className="cursor-pointer p-1 rounded bg-red-500 text-white" onClick={() => handelDeleteTask(taskId)}>
          Delete
        </button>
        <button className="cursor-pointer p-1 rounded bg-green-700 text-white px-3" onClick={() => setIsDeleteOpen(false)}>
          Exit
        </button>
      </div>
    </div>
  );
}

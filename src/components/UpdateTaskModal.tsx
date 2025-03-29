import { useContext, useState } from "react";
import { TasksContext } from "../context/tasksContext";

interface TaskForm {
  title: string;
  description: string;
}

export default function UpdateTaskModal({ task, setIsOpen }: { task: { id: string; title: string; description: string }; setIsOpen: (isOpen: boolean) => void }) {
  const { tasks, setTasks, showToast, database, setDatabase } = useContext(TasksContext);

  const [formInputs, setFormInputs] = useState<TaskForm>({ title: task.title, description: task.description });

  function handelUpdateTask(id: string) {
    const updatedTasks = tasks.filter((task: { id: string; title: string; description: string; isCompleted: boolean; dateAndTime: string }) => {
      if (task.id === id) {
        task.title = formInputs.title;
        task.description = formInputs.description;
        task.dateAndTime = new Date().toLocaleString();
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

    showToast("Task Updated Success");

    setIsOpen(false);
  }

  return (
    <section>
      <div className="container m-auto">
        <form
          className="m-auto w-full p-5 my-5 "
          onSubmit={(e) => {
            e.preventDefault();
            handelUpdateTask(task.id);
          }}
        >
          <label className="block mb-3 font-bold text-2xl" htmlFor="taskTitle">
            Task Title
          </label>
          <input
            className="block mb-3 border outline-none p-3 w-full rounded"
            autoFocus
            type="text"
            id="taskTitle"
            value={formInputs.title}
            onChange={(e) => setFormInputs({ ...formInputs, title: e.target.value })}
          />

          <label className="block mb-3 font-bold text-2xl" htmlFor="taskDescription">
            Task Description
          </label>
          <textarea
            className="block mb-3 border outline-none p-3 w-full rounded h-[200px]"
            id="taskDescription"
            value={formInputs.description}
            onChange={(e) => setFormInputs({ ...formInputs, description: e.target.value })}
          ></textarea>

          <input
            type="submit"
            disabled={formInputs.title.length === 0}
            value={"Update Task"}
            className={`${formInputs.title.length === 0 ? "bg-gray-400 cursor-no-drop text-white block w-full p-3 rounded" : "bg-green-700 cursor-pointer text-white block w-full p-3 rounded"}`}
          />
        </form>
      </div>
    </section>
  );
}

import { v4 as uuidv4 } from "uuid";
import { useContext, useState } from "react";
import { TasksContext } from "../context/tasksContext";
import { toast } from "react-toastify";

interface TaskForm {
  title: string;
  description: string;
}

export default function TaskForm() {
  const { setTasks, tasks, database, setDatabase } = useContext(TasksContext);
  const [formInputs, setFormInputs] = useState<TaskForm>({ title: "", description: "" });

  function addTask() {
    const newTasks = [...tasks, { id: uuidv4(), ...formInputs, isCompleted: false, dateAndTime: new Date().toLocaleString() }];

    setTasks(newTasks);

    const updatedDatabase = database.map((user) => {
      if (user.id === localStorage.getItem("userId")) {
        user.tasks = newTasks;
      }
      return user;
    });

    setDatabase(updatedDatabase);

    localStorage.setItem("database", JSON.stringify(updatedDatabase));

    setFormInputs({ title: "", description: "" });

    toast.success("Task Added Success");
  }

  return (
    <section>
      <div className="container m-auto">
        <form
          className="m-auto w-full p-5 my-5 "
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
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
            value={"Add Task"}
            className={`${formInputs.title.length === 0 ? "bg-gray-400 cursor-no-drop text-white block w-full p-3 rounded" : "bg-green-700 cursor-pointer text-white block w-full p-3 rounded"}`}
          />
        </form>
      </div>
    </section>
  );
}

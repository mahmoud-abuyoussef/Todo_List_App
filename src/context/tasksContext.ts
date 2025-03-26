import { createContext } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}

interface TasksContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {},
});

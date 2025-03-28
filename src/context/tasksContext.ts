import { createContext } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}

interface TasksContextType {
  database: Task[];
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setDatabase: (tasks: []) => void;
  showToast: (message: string) => void;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  database: [],
  setTasks: () => {},
  setDatabase: () => {},
  showToast: () => {},
});

import { createContext } from "react";

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

interface TasksContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  showToast: (message: string) => void;
  database: User[];
  setDatabase: (database: User[]) => void;
}

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {},
  showToast: () => {},
  database: [],
  setDatabase: () => {},
});

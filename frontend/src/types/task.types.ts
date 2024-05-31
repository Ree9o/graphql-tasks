import { TaskStatus } from "./taskStatus.types";
export type Task = {
  id: number;
  name: string;
  dueDate: string;
  status: TaskStatus;
  description: string;
};

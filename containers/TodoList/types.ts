import { Dispatch, SetStateAction } from "react";

export interface Tasks {
  id: string;
  task: string;
}

export interface TodoListProps {
  tasks: Array<Tasks>;
  setTasks: Dispatch<SetStateAction<Array<Tasks>>>;
}

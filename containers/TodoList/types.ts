import { Dispatch, SetStateAction } from "react";

export interface ITodoList {
  id: string;
  task: string;
}

export interface IProps {
  tasks: Array<ITodoList>;
  setTasks: Dispatch<SetStateAction<Array<ITodoList>>>;
}

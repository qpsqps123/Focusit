import { Dispatch, SetStateAction } from "react";

export interface Tasks {
  id: string;
  title: string;
  inputValueToEdit: string;
  isMenuOpen: boolean;
  isEditing: boolean;
}

export interface TodoListProps {
  tasks: Array<Tasks>;
  setTasks: Dispatch<SetStateAction<Array<Tasks>>>;
}

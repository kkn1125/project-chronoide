import { atom } from "recoil";
import { createTodo } from "../models/Todo";

const root = createTodo({
  title: "root",
  content: "root directory",
  directories: ["root"],
});

export const todoState = atom<Todo[]>({
  key: "todoState", // unique ID (with respect to other atoms/selectors)
  default: [root], // default value (aka initial value),
  dangerouslyAllowMutability: true,
});

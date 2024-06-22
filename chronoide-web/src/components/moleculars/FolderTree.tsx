import { Stack } from "@mui/material";
import Folder from "../atoms/Folder";
import { useMemo } from "react";

interface FolderTree {
  todos: Todo[];
}

function FolderTree({ todos }: FolderTree) {
  return (
    <Stack>
      {todos
        // .filter((todo) => todo.type === "folder")
        .map((todo, i) => (
          <Folder key={todo.title + i} todo={todo} isRoot={i === 0} />
        ))}
    </Stack>
  );
}

export default FolderTree;

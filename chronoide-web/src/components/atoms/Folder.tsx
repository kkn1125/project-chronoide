import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TopicIcon from "@mui/icons-material/Topic";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { useMemo, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isNil } from "../../common/features";
import { createTodo } from "../../models/Todo";
import { folderState } from "../../recoils/folder.state";
import { todoState } from "../../recoils/todo.state";
import FolderTree from "../moleculars/FolderTree";

interface FolderProps {
  todo: Todo;
  isRoot?: boolean;
}

function Folder({ todo, isRoot }: FolderProps) {
  const [open, setOpen] = useState(false);
  const setFolder = useSetRecoilState(folderState);
  const setTodos = useSetRecoilState(todoState);
  const folders = useRecoilValue(folderState);

  const currentFolder = useMemo(() => {
    return todo.directories[todo.directories.length - 1];
  }, [todo.directories]);

  function handleSelectFolder(todo: Todo) {
    setFolder((folder) => {
      return {
        ...folder,
        selected: todo.directories,
      };
    });
  }

  function handleAddFolder({ name }: { name: string }) {
    const folder = createTodo({
      id: 1,
      type: "folder",
      title: name,
      content: name + " content",
      directories: [...todo.directories, name],
    });

    todo.childrens.push(folder);

    setTodos((todos) => todos.slice(0));

    // setTodos((todos) => {
    //   const newTodos = [...todos];
    //   for (const td of newTodos) {
    //     const isSame = checkSameDir(td.directories, todo.directories);
    //     if (isSame) {
    //       folder.directories[folder.directories.length - 1] +=
    //         folder.directories.length;
    //       td.childrens.push(folder);
    //       break;
    //     }
    //   }
    //   return newTodos;
    // });
  }

  return (
    <Stack key={todo.title}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        sx={{
          position: "relative",
          ml: todo.directories.length,
        }}>
        {todo.childrens ? "true" : "false"}
        {todo.childrens.length > 0 && (
          <IconButton
            size="small"
            onClick={() => setOpen(!open)}
            sx={{
              position: "absolute",
              right: "100%",
            }}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        )}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ color: (theme) => theme.palette.text.primary }}>
          {open ? (
            <FolderOpenIcon />
          ) : todo.childrens.length > 0 ? (
            <TopicIcon />
          ) : (
            <FolderIcon />
          )}
        </Stack>
        <Button
          variant={
            folders.selected[folders.selected.length - 1] === currentFolder
              ? "contained"
              : "text"
          }
          size="small"
          onClick={() => handleSelectFolder(todo)}>
          {currentFolder} {isNil(isRoot) ? "" : `(${todo.childrens.length})`}
        </Button>
        <IconButton onClick={() => handleAddFolder({ name: "new folder" })}>
          <CreateNewFolderIcon />
        </IconButton>
      </Stack>
      {open && (
        <Box sx={{ ml: todo.directories.length }}>
          <FolderTree todos={todo.childrens} />
        </Box>
      )}
    </Stack>
  );
}

export default Folder;

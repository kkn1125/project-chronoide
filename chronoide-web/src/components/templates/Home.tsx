import {
  Autocomplete,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChangeEvent, useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkSameDir } from "../../common/features";
import { Message } from "../../libs/enums";
// import { TodoModel } from "../../models/Todo";
import { folderState } from "../../recoils/folder.state";
import { todoState } from "../../recoils/todo.state";
import FolderTree from "../moleculars/FolderTree";
import { createTodo } from "../../models/Todo";

function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [todoData, setTodoData] = useState<TodoRequire>();
  const folders = useRecoilValue(folderState);

  function handleCreateTodo(
    todoRequire: Partial<TodoRequire>,
    // type: "folder" | "file",
  ) {
    setTodos((todos) => {
      const todoModel = createTodo(todoRequire);
      todoModel.type = "file";
      const newTodos = todos.slice(0);
      let isAdded = false;

      for (const todo of newTodos) {
        const isSame = checkSameDir(todo.directories, todoModel.directories);
        if (isSame) {
          console.log(todo.childrens, todoModel);
          if (todo.type === "folder") {
            Object.assign(todo.childrens, [...todo.childrens, todoModel]);
            isAdded = true;
          }
          break;
        }
      }

      if (!isAdded) {
        newTodos.push(todoModel);
      }

      return newTodos;
    });
    // setTodos(newTodos);
  }

  function handleChangeTodoData(key: string, value: string) {
    setTodoData((todoData) => ({
      ...todoData,
      [key]: value,
    }));
  }

  return (
    <Stack>
      {/* section #1 */}
      <Toolbar />

      <Container>
        <Typography component="h2" fontWeight={700} fontSize={24} gutterBottom>
          Your Task
        </Typography>
        <Paper sx={{ p: 3 }}>
          <FolderTree todos={todos} />
        </Paper>
        <Toolbar />
        <Stack
          component={Paper}
          direction="row"
          gap={1}
          sx={{
            p: 3,
          }}>
          <Autocomplete
            disablePortal
            freeSolo
            size="small"
            options={todos.map((todo) => todo.group)}
            sx={{ flex: 0.3 }}
            renderInput={(params) => (
              <TextField {...params} label={Message.Group.PLACEHOLDER} />
            )}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeTodoData("group", e.target.value)
            }
          />
          <TextField
            size="small"
            placeholder={Message.Task.PLACEHOLDER}
            sx={{ flex: 0.7 }}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeTodoData("title", e.target.value)
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleCreateTodo({
                title: todoData.title,
                content: todoData.content,
                directories: folders.selected || ["root"],
              })
            }>
            ✍️ 추가
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
}

export default Home;

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
import { Effect } from "effect";
import { ChangeEvent, KeyboardEvent, SyntheticEvent, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { isNil } from "../../common/features";
import { Message } from "../../libs/enums";
import {
  ChronoFolder,
  ChronoTask,
  ChronoTaskKeys,
  ChronoTaskValues,
} from "../../models/Chrono";
import { ChronoTree } from "../../models/ChronoTree";
import { chronoTreeState } from "../../recoils/chrono.state";
import { folderState } from "../../recoils/folder.state";
import FolderTree from "../moleculars/FolderTree";

function Home() {
  const [chronoTree, setChronoTree] = useRecoilState(chronoTreeState);
  const [chronoDataForm, setChronoDataForm] = useState<{
    group: string;
    title: string;
    content: string;
  }>({ group: "", title: "", content: "" });
  const folders = useRecoilValue(folderState);

  function handleChangeChronoDataForm(
    key: ChronoTaskKeys,
    value: ChronoTaskValues,
  ) {
    const changeChronoDataForm = Effect.sync(() => {
      setChronoDataForm((chronoDataForm) => ({
        ...chronoDataForm,
        [key]: value,
      }));
    });

    Effect.runSync(changeChronoDataForm);
  }

  function handleCreateChronoTask() {
    const checkSelectedFolder = Effect.sync(() => {
      if (!folders.selected) {
        folders.selected = chronoTree.childrens[0] as ChronoFolder;
      }
      return folders.selected;
    });

    const createChronoTask = Effect.sync(() => {
      const chronoTask = new ChronoTask({
        title: chronoDataForm.title,
        content: chronoDataForm.content,
      });

      chronoTask.group = chronoDataForm.group;
      chronoTask.name = "New Task";
      return chronoTask;
    });

    const addChronoInTree = (task: ChronoTask) =>
      Effect.sync(() => {
        folders.selected?.addChrono(task);
      });

    const refreshTree = Effect.sync(() => {
      setChronoTree((chronoTree) => {
        const newChronoTree = new ChronoTree();
        newChronoTree.childrens = [...chronoTree.childrens];
        return newChronoTree;
      });
    });

    const initializeChronoDataForm = Effect.sync(() => {
      setChronoDataForm({
        title: "",
        content: "",
        group: "",
      });
      folders.selected = null;
    });

    const initializeSelectedFolder = Effect.sync(() => {
      folders.selected = null;
    });

    const handleCreateChronoTaskPipe = Effect.gen(function* () {
      if (
        Object.values(chronoDataForm).some((item) => isNil(item) || item === "")
      ) {
        yield* Effect.fail(new Error("빈 필드가 있습니다."));
      }
      yield* checkSelectedFolder;
      const chronoTask = yield* createChronoTask;
      yield* addChronoInTree(chronoTask);
      yield* refreshTree;
      yield* initializeChronoDataForm;
      yield* initializeSelectedFolder;
    });

    Effect.runSync(handleCreateChronoTaskPipe);
  }

  function handleDetectAutoCompletes(e: SyntheticEvent) {
    const target = e.target;
    if (target instanceof HTMLLIElement) {
      const text = target.innerText;
      setChronoDataForm((chronoData) => ({
        ...chronoData,
        group: text,
      }));
    }
  }

  return (
    <Stack>
      {/* section #1 */}
      <Toolbar />

      <Container>
        <Typography component="h2" fontWeight={700} fontSize={24} gutterBottom>
          Your Task
        </Typography>
        <Paper sx={{ py: 3, pl: 10, pr: 3, overflow: "auto", maxHeight: 200 }}>
          <FolderTree chronoTree={chronoTree} />
        </Paper>
        <Toolbar />
        {/* {chronoTree.getAllGroups()} */}
        {/* <Button onClick={copyTest}>copy</Button> */}
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
            options={chronoTree.getAllGroups()}
            sx={{ flex: 0.3 }}
            value={chronoDataForm.group}
            renderInput={(params) => (
              <TextField {...params} label={Message.Group.PLACEHOLDER} />
            )}
            onChange={handleDetectAutoCompletes}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
              handleChangeChronoDataForm(
                "group",
                (e.target as HTMLInputElement).value,
              );
            }}
          />
          <TextField
            size="small"
            placeholder={Message.Task.PLACEHOLDER}
            sx={{ flex: 0.3 }}
            value={chronoDataForm.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeChronoDataForm("title", e.target.value)
            }
          />
          <TextField
            multiline
            size="small"
            placeholder={Message.Content.PLACEHOLDER}
            sx={{ flex: 0.4 }}
            value={chronoDataForm.content}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeChronoDataForm("content", e.target.value)
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateChronoTask()}>
            ✍️ 추가
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
}

export default Home;

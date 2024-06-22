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
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
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
    setChronoDataForm((chronoDataForm) => ({
      ...chronoDataForm,
      [key]: value,
    }));
  }

  function handleCreateChronoTask() {
    if (!folders.selected) {
      folders.selected = chronoTree.childrens[0] as ChronoFolder;
    }

    const chronoTask = new ChronoTask({
      title: chronoDataForm.title,
      content: chronoDataForm.content,
    });

    chronoTask.group = chronoDataForm.group;
    chronoTask.name = "New Task";

    folders.selected?.addChrono(chronoTask);

    setChronoTree((chronoTree) => {
      const newChronoTree = new ChronoTree();
      newChronoTree.childrens = [...chronoTree.childrens];
      return newChronoTree;
    });
    folders.selected = null;
    setChronoDataForm({
      title: "",
      content: "",
      group: "",
    });
  }

  return (
    <Stack>
      {/* section #1 */}
      <Toolbar />

      <Container>
        <Typography component="h2" fontWeight={700} fontSize={24} gutterBottom>
          Your Task
        </Typography>
        <Paper sx={{ p: 3, overflow: "auto", maxHeight: 200 }}>
          <FolderTree chronoTree={chronoTree} />
        </Paper>
        <Toolbar />
        {chronoTree.getAllGroups()}
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

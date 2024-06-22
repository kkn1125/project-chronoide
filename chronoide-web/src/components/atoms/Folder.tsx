import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TopicIcon from "@mui/icons-material/Topic";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, memo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isNil } from "../../common/features";
import { ChronoFolder, ChronoTask } from "../../models/Chrono";
import { ChronoTree } from "../../models/ChronoTree";
import { chronoTreeState } from "../../recoils/chrono.state";
import { folderState } from "../../recoils/folder.state";
import FolderTree from "../moleculars/FolderTree";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ChronoFolderLevel = memo(({ chrono }: { chrono: ChronoFolder }) => {
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [folders, setFolder] = useRecoilState(folderState);
  const [chronoTree, setChronoTree] = useRecoilState(chronoTreeState);
  const [chronoData, setChronoData] = useState<Partial<ChronoFolder>>({});

  function handleSelectFolder() {
    if (folders.selected === chrono) {
      folders.selected = null;
      setFolder((folder) => {
        return {
          ...folder,
        };
      });
    } else {
      folders.selected = null;
      setFolder((folder) => {
        return {
          ...folder,
          selected: chrono,
        };
      });
    }
  }

  function handleAddFolder() {
    const chronoFolder = new ChronoFolder();
    chronoFolder.name = "new folder";
    chrono.addChrono(chronoFolder);
    setOpen(true);

    setChronoTree((chronoTree) => {
      const newChronoTree = new ChronoTree();
      newChronoTree.childrens = [...chronoTree.childrens];
      return newChronoTree;
    });
  }

  function handleRemoveChrono() {
    chronoTree.deleteChrono(chrono);
    setChronoTree((chronoTree) => {
      const newChronoTree = new ChronoTree();
      newChronoTree.childrens = [...chronoTree.childrens];
      return newChronoTree;
    });
  }

  function handleOpen() {
    chrono.childrens.length > 0 && setOpen(!open);
  }

  function handleEditName() {
    const newMode = !editMode;
    setEditMode(newMode);
    if (!newMode) {
      chrono.name = chronoData.name || chrono.name;
      setChronoTree((chronoTree) => {
        const newChronoTree = new ChronoTree();
        newChronoTree.childrens = [...chronoTree.childrens];
        return newChronoTree;
      });
    }
  }
  function handleChangeChronoName(e: ChangeEvent<HTMLInputElement>) {
    setChronoData((chronoData) => ({
      ...chronoData,
      name: e.target.value,
    }));
  }

  return (
    <Stack>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        sx={{
          position: "relative",
          ml: chrono.depth,
        }}>
        {chrono.childrens.length > 0 && (
          <IconButton
            size="small"
            onClick={handleOpen}
            sx={{
              position: "absolute",
              right: "100%",
            }}>
            {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
          </IconButton>
        )}

        <IconButton
          color={folders.selected === chrono ? "success" : "inherit"}
          size="small"
          onClick={handleSelectFolder}>
          {folders.selected === chrono ? (
            <CheckBoxIcon />
          ) : (
            <CheckBoxOutlineBlankOutlinedIcon />
          )}
        </IconButton>

        <Stack
          direction="row"
          alignItems="center"
          sx={{ color: (theme) => theme.palette.text.primary }}>
          {open ? (
            <FolderOpenIcon color="warning" />
          ) : chrono.childrens.length > 0 ? (
            <TopicIcon color="warning" />
          ) : (
            <FolderIcon color="warning" />
          )}
        </Stack>

        {editMode ? (
          <TextField
            variant="standard"
            size="small"
            value={isNil(chronoData.name) ? chrono.name : chronoData.name}
            onChange={handleChangeChronoName}
          />
        ) : (
          <Button size="small" onClick={handleOpen}>
            {chrono.name}
            {isNil(chrono.parent) ? "" : `(${chrono.childrens.length})`}
          </Button>
        )}

        <IconButton color="warning" onClick={() => handleEditName()}>
          {editMode ? <CheckCircleOutlineIcon /> : <EditNoteIcon />}
        </IconButton>
        <IconButton color="primary" onClick={() => handleAddFolder()}>
          <CreateNewFolderIcon />
        </IconButton>
        {!chrono.root && (
          <IconButton color="error" onClick={() => handleRemoveChrono()}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
      {open && (
        <Box sx={{ ml: chrono.depth }}>
          <FolderTree chronos={chrono.childrens} />
        </Box>
      )}
    </Stack>
  );
});

const ChronoTaskLevel = memo(({ chrono }: { chrono: ChronoTask }) => {
  const chronoTree = useRecoilValue(chronoTreeState);
  const setChronoTree = useSetRecoilState(chronoTreeState);

  function handleRemoveChrono() {
    chronoTree.deleteChrono(chrono);
    setChronoTree((chronoTree) => {
      const newChronoTree = new ChronoTree();
      newChronoTree.childrens = [...chronoTree.childrens];
      return newChronoTree;
    });
  }

  return (
    <Stack>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        sx={{
          position: "relative",
          ml: chrono.depth,
        }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ color: (theme) => theme.palette.text.primary }}>
          <DescriptionIcon />
        </Stack>
        <Stack direction="row" gap={1} alignItems="center">
          <Chip size="small" color="success" label={chrono.group} />
          <Chip size="small" color="info" label={chrono.name} />
          <Typography fontSize={14} fontWeight={700}>
            {chrono.title}
          </Typography>
          <Typography fontSize={10}>{chrono.content + "2"}</Typography>
        </Stack>
        <IconButton color="error" onClick={() => handleRemoveChrono()}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
});

interface FolderProps {
  chrono: ChronoFolder | ChronoTask;
}

const Folder = memo(({ chrono }: FolderProps) => {
  if (chrono instanceof ChronoFolder) {
    return <ChronoFolderLevel chrono={chrono} />;
  }
  return <ChronoTaskLevel chrono={chrono} />;
});

export default Folder;

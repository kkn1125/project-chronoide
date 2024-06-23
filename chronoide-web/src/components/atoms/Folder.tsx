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
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isNil } from "../../common/features";
import { ChronoFolder, ChronoTask } from "../../models/Chrono";
import { ChronoTree } from "../../models/ChronoTree";
import { chronoTreeState } from "../../recoils/chrono.state";
import { folderState } from "../../recoils/folder.state";
import Editer from "../moleculars/Editer";
import FolderTree from "../moleculars/FolderTree";

const ChronoFolderLevel = memo(({ chrono }: { chrono: ChronoFolder }) => {
  const [open, setOpen] = useState(false);
  const [folders, setFolder] = useRecoilState(folderState);
  const [chronoTree, setChronoTree] = useRecoilState(chronoTreeState);

  useEffect(() => {
    setOpen(chrono.childrens.length > 0);
  }, [chrono.childrens]);

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

  return (
    <Stack>
      {/* 폴더 인라인 */}
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

        {/* 선택 */}
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

        {/* 폴더 아이콘 */}
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

        {/* 폴더 제목 */}
        <Button size="small" onClick={handleOpen}>
          {chrono.name}
          {isNil(chrono.parent) ? "" : `(${chrono.childrens.length})`}
        </Button>

        {/* 수정모드 토글 */}
        <Editer chrono={chrono} />

        {/* 폴더 생성 */}
        <IconButton color="primary" onClick={() => handleAddFolder()}>
          <CreateNewFolderIcon />
        </IconButton>

        {/* 삭제 버튼 */}
        {!chrono.root && (
          <IconButton color="error" onClick={() => handleRemoveChrono()}>
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>

      {/* 하위 폴더가 존재할 시 폴더트리 재귀 호출 */}
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
        <Editer chrono={chrono} />
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

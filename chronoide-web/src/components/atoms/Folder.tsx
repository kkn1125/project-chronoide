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
import { Box, Button, IconButton, Stack } from "@mui/material";
import { Dispatch, SetStateAction, memo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ChronoFolder, ChronoTask } from "../../models/Chrono";
import { ChronoTree } from "../../models/ChronoTree";
import { chronoTreeState } from "../../recoils/chrono.state";
import { folderState } from "../../recoils/folder.state";
import Editer from "../moleculars/Editer";
import FolderTree from "../moleculars/FolderTree";

const ChronoFolderLevel = memo(
  ({
    chrono,
    handleRemoveChrono,
    showTools,
    setShowTools,
  }: {
    chrono: ChronoFolder;
    handleRemoveChrono: () => void;
    showTools: boolean;
    setShowTools: Dispatch<SetStateAction<boolean>>;
  }) => {
    const [open, setOpen] = useState(false);
    const [folders, setFolder] = useRecoilState(folderState);
    const setChronoTree = useSetRecoilState(chronoTreeState);

    // useEffect(() => {
    //   // setOpen(chrono.childrens.length > 0);
    // }, [chrono.childrens]);

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

    function handleOpen() {
      chrono.childrens.length > 0 && setOpen(!open);
    }

    return (
      <Stack>
        {/* 폴더 인라인 */}
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          sx={{
            position: "relative",
            ml: chrono.depth * 0.1,
            height: 34,
          }}
          onMouseEnter={() => setShowTools(true)}
          onMouseLeave={() => setShowTools(false)}>
          {/* field */}
          <Stack direction="row">
            {/* folder opened arrow */}
            {chrono.childrens.length > 0 && (
              <IconButton
                size="small"
                onClick={handleOpen}
                sx={{
                  position: "absolute",
                  right: "calc(100% + 39px)",
                }}>
                {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              </IconButton>
            )}

            {/* 선택 */}
            <IconButton
              size="small"
              color={folders.selected === chrono ? "success" : "inherit"}
              onClick={handleSelectFolder}
              sx={{
                position: "absolute",
                right: "calc(100% + 5px)",
              }}>
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
              {`(${chrono.childrens.length})`}
            </Button>
          </Stack>

          {/* edit mode */}
          {showTools && (
            <Stack direction="row">
              {/* 수정모드 토글 */}
              {!chrono.root && <Editer chrono={chrono} />}

              {/* 폴더 생성 */}
              <IconButton
                size="small"
                color="primary"
                onClick={() => handleAddFolder()}>
                <CreateNewFolderIcon />
              </IconButton>

              {/* 삭제 버튼 */}
              {!chrono.root && (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveChrono()}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Stack>
          )}
        </Stack>

        {/* 하위 폴더가 존재할 시 폴더트리 재귀 호출 */}
        {open && (
          <Box sx={{ ml: chrono.depth * 0.1 }}>
            <FolderTree chronos={chrono.childrens} />
          </Box>
        )}
      </Stack>
    );
  },
);

const ChronoTaskLevel = memo(
  ({
    chrono,
    handleRemoveChrono,
    showTools,
    setShowTools,
  }: {
    chrono: ChronoTask;
    handleRemoveChrono: () => void;
    showTools: boolean;
    setShowTools: Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <Stack>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          sx={{
            position: "relative",
            ml: chrono.depth * 0.1,
            height: 34,
          }}
          onMouseEnter={() => setShowTools(true)}
          onMouseLeave={() => setShowTools(false)}>
          {/* field */}
          <Stack direction="row">
            {/* 작업 아이콘 */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{ color: (theme) => theme.palette.text.primary }}>
              <DescriptionIcon />
            </Stack>
            {/* 폴더 제목 */}
            <Button size="small">{chrono.name}</Button>
          </Stack>

          {/* edit mode */}
          {showTools && (
            <Stack direction="row">
              {/* 수정모드 토글 */}
              <Editer chrono={chrono} />

              {/* 삭제 버튼 */}
              <IconButton
                size="small"
                color="error"
                onClick={() => handleRemoveChrono()}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    );
  },
);

interface FolderProps {
  chrono: ChronoFolder | ChronoTask;
}

const Folder = memo(({ chrono }: FolderProps) => {
  const chronoTree = useRecoilValue(chronoTreeState);
  const setChronoTree = useSetRecoilState(chronoTreeState);
  const [showTools, setShowTools] = useState(false);

  function handleRemoveChrono() {
    chronoTree.deleteChrono(chrono);
    setChronoTree((chronoTree) => {
      const newChronoTree = new ChronoTree();
      newChronoTree.childrens = [...chronoTree.childrens];
      return newChronoTree;
    });
  }

  if (chrono instanceof ChronoFolder) {
    return (
      <ChronoFolderLevel
        chrono={chrono}
        handleRemoveChrono={handleRemoveChrono}
        showTools={showTools}
        setShowTools={setShowTools}
      />
    );
  }
  return (
    <ChronoTaskLevel
      chrono={chrono}
      handleRemoveChrono={handleRemoveChrono}
      showTools={showTools}
      setShowTools={setShowTools}
    />
  );
});

export default Folder;

import { Stack } from "@mui/material";
import Folder from "../atoms/Folder";
import { ChronoFolder, ChronoTask } from "../../models/Chrono";
import { ChronoTree } from "../../models/ChronoTree";
import { useMemo } from "react";

interface FolderTree {
  chronos?: (ChronoTask | ChronoFolder)[];
  chronoTree?: ChronoTree;
}

function FolderTree(props: FolderTree) {
  const chronoList = useMemo(
    () => (props.chronoTree ? props.chronoTree.childrens : props.chronos) || [],
    [props.chronoTree, props.chronos],
  );

  return (
    <Stack sx={{ mx: 3 }} gap={1}>
      {chronoList.map((chrono) => (
        <Folder key={chrono.type + "-" + chrono.id} chrono={chrono} />
      ))}
    </Stack>
  );
}

export default FolderTree;

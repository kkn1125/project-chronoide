import { atom } from "recoil";
import { ChronoFolder } from "../models/Chrono";

export const folderState = atom<{
  selected: ChronoFolder | null;
  folders: ChronoFolder[];
}>({
  key: "folderState",
  default: {
    selected: null,
    folders: [],
  },
  dangerouslyAllowMutability: true,
});

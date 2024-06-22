import { atom } from "recoil";

export const folderState = atom({
  key: "folderState",
  default: {
    selected: [],
    folders: [],
  },
});

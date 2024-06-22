import { atom } from "recoil";
import { ChronoTree } from "../models/ChronoTree";
// import { createChrono } from "../models/Chrono";

const chronoTree = new ChronoTree();

export const chronoTreeState = atom<ChronoTree>({
  key: "chronoTreeState", // unique ID (with respect to other atoms/selectors)
  default: chronoTree, // default value (aka initial value),
  dangerouslyAllowMutability: true,
});

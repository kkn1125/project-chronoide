import { STORAGE_NAME } from "../common/variables";
import { Chrono, ChronoFolder, ChronoTask } from "./Chrono";

export class ChronoTree {
  childrens: (ChronoFolder | ChronoTask)[] = [];

  constructor() {
    const rootChronoFolder = new ChronoFolder({ root: true });
    rootChronoFolder.name = "root";
    if (this.childrens.length === 0) {
      this.addRootFolder(rootChronoFolder);
    }
    // this.loadLocalStorage();
  }

  findByChronoId(id: number) {
    for (const item of this.childrens) {
      if (item.id === id) {
        return item;
      } else if (item instanceof ChronoFolder) {
        return item.findByChronoId(id);
      }

      return undefined;
    }
  }

  findByChrono(chrono: ChronoFolder | ChronoTask) {
    for (const item of this.childrens) {
      if (item === chrono) {
        return item;
      } else if (item instanceof ChronoFolder) {
        return item.findByChrono(chrono);
      }

      return undefined;
    }
  }

  addRootFolder(folder: ChronoFolder) {
    this.childrens.push(folder);
  }

  addRootTask(task: ChronoTask) {
    this.childrens.push(task);
  }

  deleteChrono(chrono: ChronoFolder | ChronoTask) {
    if (chrono.parent) {
      const chronoParent = this.findByChronoId(chrono.parent);
      if (chronoParent && chronoParent instanceof ChronoFolder) {
        chronoParent.childrens =
          chronoParent.childrens?.filter(
            (child) => !(child.id === chrono.id && child.type === chrono.type),
          ) || [];
      }
    }
  }

  getAllGroups(): string[] {
    const sets = this.childrens.map((folder) => {
      if (folder instanceof ChronoFolder) {
        const groups = folder.getAllGroups();
        return groups;
      }
      return folder.group;
    });
    console.log();
    return [...new Set(sets.flat(10))];
  }

  saveLocalStorage() {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(this.childrens));
  }

  loadLocalStorage() {
    if (!(STORAGE_NAME in localStorage)) {
      localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
    }
    const storage = localStorage.getItem(STORAGE_NAME) as string;
    const json = JSON.parse(storage);
    console.log("origin", json);
    const tempTree = new ChronoTree();
    // Object.assign(tempTree, json);
    tempTree.childrens = json.map((child) => {
      if (child.type === "folder" && "childrens" in child) {
        const chronoFolder = new ChronoFolder();
        Object.assign(chronoFolder, child);
        chronoFolder.loadChildrens();
        if (Chrono.id < chronoFolder.id) {
          Chrono.id = chronoFolder.id;
        }
        return chronoFolder;
      } else {
        const chronoTask = new ChronoTask();
        Object.assign(chronoTask, child);
        if (Chrono.id < chronoTask.id) {
          Chrono.id = chronoTask.id;
        }
        return chronoTask;
      }
    });
    console.log("restore", tempTree);
    Object.assign(this, tempTree);
  }
}

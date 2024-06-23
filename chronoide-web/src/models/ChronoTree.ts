import { ChronoFolder, ChronoTask } from "./Chrono";

export class ChronoTree {
  childrens: (ChronoFolder | ChronoTask)[] = [];

  constructor() {
    const rootChronoFolder = new ChronoFolder({ root: true });
    rootChronoFolder.name = "root";
    if (this.childrens.length === 0) {
      this.addRootFolder(rootChronoFolder);
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
      chrono.parent.childrens =
        chrono.parent.childrens?.filter(
          (child) => !(child.id === chrono.id && child.type === chrono.type),
        ) || [];
    }
  }

  getAllGroups(): string[] {
    const sets = this.childrens.reduce((acc, folder) => {
      if (folder instanceof ChronoFolder) {
        const groups = folder.getAllGroups();
        for (const group of groups) {
          acc.add(group);
        }
      }
      acc.add(folder.group);
      return acc;
    }, new Set<string>());
    return [...sets];
  }
}

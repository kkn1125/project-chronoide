export class Chrono {
  static id: number = 0;
  id: number = 0;
  type: "folder" | "task" = "folder";
  name: string = "no name";
  group: string = "no group";
  order: number = -1;
  depth: number = 0;

  constructor() {
    this.id = Chrono.id += 1;
  }
}

export class ChronoFolder extends Chrono {
  readonly root: boolean = false;

  parent: number | null = null;

  childrens: (ChronoFolder | ChronoTask)[] = [];

  constructor(option?: { parent?: number; root?: boolean }) {
    super();

    this.type = "folder";

    if (option) {
      if (option.parent) this.parent = option.parent;
      if (option.root) this.root = option.root;
    }
  }

  loadChildrens() {
    this.childrens = this.childrens.map((child) => {
      if (child.type === "folder") {
        const folder = new ChronoFolder();
        Object.assign(folder, child);
        folder.loadChildrens();
        if (Chrono.id < folder.id) {
          Chrono.id = folder.id;
        }
        return folder;
      } else {
        const task = new ChronoTask();
        Object.assign(task, child);
        if (Chrono.id < task.id) {
          Chrono.id = task.id;
        }
        return task;
      }
    });
  }

  findByChronoId(id: number): ChronoFolder | ChronoTask | undefined {
    for (const item of this.childrens) {
      if (item.id === id) {
        return item;
      } else if (item instanceof ChronoFolder) {
        return item.findByChronoId(id);
      }

      return undefined;
    }
  }

  findByChrono(
    chrono: ChronoFolder | ChronoTask,
  ): ChronoFolder | ChronoTask | undefined {
    return this.childrens.find((item) => {
      if (item === chrono) {
        return true;
      } else if (item instanceof ChronoFolder) {
        return !!item.findByChrono(chrono);
      }

      return false;
    });
  }

  addChrono(chrono: ChronoFolder | ChronoTask) {
    chrono.parent = this.id;
    chrono.depth = this.depth + 1;
    this.childrens.push(chrono);
  }

  getAllGroups() {
    const temp = this.childrens.reduce((acc: string[], folder) => {
      if (folder instanceof ChronoFolder) {
        acc.concat(folder.getAllGroups());
      }

      acc.push(folder.group);

      return acc;
    }, []);
    temp.push(this.group);
    return temp;
  }

  // toJSON() {
  //   const json = { ...this };
  //   const childrens = json.childrens.map((child) => child.toJSON());
  //   json.childrens = childrens;
  //   return json;
  // }
}

export class ChronoTask extends Chrono {
  // static copy(chrono: ChronoTask) {
  //   const chronoTask = new ChronoTask();
  //   chronoTask.id = chrono.id;
  //   chronoTask.name = chrono.name;
  //   chronoTask.group = chrono.group;
  //   chronoTask.order = chrono.order;
  //   chronoTask.depth = chrono.depth;
  //   chronoTask.parent = chrono.parent;

  //   chronoTask.title = chrono.title;
  //   chronoTask.content = chrono.content;
  //   chronoTask.start_at = chrono.start_at;
  //   chronoTask.end_at = chrono.end_at;
  //   chronoTask.withHoliday = chrono.withHoliday;

  //   return chronoTask;
  // }

  parent: number | null = null;

  title: string = "no title";
  content: string = "no content";
  start_at: number = Date.now();
  end_at: number = Date.now();
  withHoliday: boolean = false;

  constructor(option?: { title?: string; content?: string }) {
    super();

    this.type = "task";

    if (option) {
      if (option.title) this.title = option.title;
      if (option.content) this.content = option.content;
    }
  }

  get duration() {
    return Math.ceil((this.end_at - this.start_at) / 1000 / 60 / 60 / 24);
  }

  // toJSON() {
  //   const json = { ...this };
  //   return json;
  // }
}

export type ChronoTaskKeys = keyof ChronoTask;
export type ChronoTaskValues = ChronoTask[ChronoTaskKeys];

export class Chrono {
  static id: number = 0;
  id: number = 0;
  type: "folder" | "task";
  name: string;
  group: string = "no group";
  order: number = -1;
  depth: number = 0;

  constructor() {
    this.id = Chrono.id += 1;
  }
}

export class ChronoFolder extends Chrono {
  static copy(chrono?: ChronoFolder) {
    const chronoFolder = new ChronoFolder();
    chronoFolder.id = chrono.id;
    chronoFolder.name = chrono.name;
    chronoFolder.group = chrono.group;
    chronoFolder.order = chrono.order;
    chronoFolder.depth = chrono.depth;
    if (chrono.parent) {
      const parentFolder = new ChronoFolder();
      parentFolder.id = chrono.parent.id;
      parentFolder.name = chrono.parent.name;
      parentFolder.group = chrono.parent.group;
      parentFolder.order = chrono.parent.order;
      parentFolder.depth = chrono.parent.depth;
      parentFolder.parent = chrono.parent;
      parentFolder.childrens =
        chrono.parent.childrens.map((child) => {
          if (child instanceof ChronoFolder) {
            child.parent = chrono;
            return ChronoFolder.copy(child);
          } else {
            child.parent = chrono;
            return ChronoTask.copy(child);
          }
        }) || [];
      chronoFolder.parent = parentFolder;
    }
    chronoFolder.childrens = chrono.childrens.map((child) => {
      if (child instanceof ChronoFolder) {
        child.parent = chrono;
        return ChronoFolder.copy(child);
      } else {
        child.parent = chrono;
        return ChronoTask.copy(child);
      }
    });

    return chronoFolder;
  }

  readonly root: boolean = false;

  parent: ChronoFolder;

  childrens: (ChronoFolder | ChronoTask)[] = [];

  constructor(option?: { parent?: ChronoFolder; root?: boolean }) {
    super();

    this.type = "folder";

    this.parent = option?.parent;

    this.root = option?.root || false;
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
    chrono.parent = this;
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
}

export class ChronoTask extends Chrono {
  static copy(chrono: ChronoTask) {
    const chronoTask = new ChronoTask();
    chronoTask.id = chrono.id;
    chronoTask.name = chrono.name;
    chronoTask.group = chrono.group;
    chronoTask.order = chrono.order;
    chronoTask.depth = chrono.depth;
    chronoTask.parent = chrono.parent;

    chronoTask.title = chrono.title;
    chronoTask.content = chrono.content;
    chronoTask.start_at = chrono.start_at;
    chronoTask.end_at = chrono.end_at;
    chronoTask.withHoliday = chrono.withHoliday;

    return chronoTask;
  }

  parent: ChronoFolder;

  title: string;
  content: string;
  start_at: number = 0;
  end_at: number = 0;
  withHoliday: boolean = false;

  constructor(option?: { title?: string; content?: string }) {
    super();

    this.type = "task";

    this.title = option?.title;
    this.content = option?.content;
  }

  get duration() {
    return Math.ceil((this.end_at - this.start_at) / 1000 / 60 / 60 / 24);
  }
}

export type ChronoTaskKeys = keyof ChronoTask;
export type ChronoTaskValues = ChronoTask[ChronoTaskKeys];

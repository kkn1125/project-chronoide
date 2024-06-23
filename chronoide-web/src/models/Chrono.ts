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

  parent: ChronoFolder | null = null;

  childrens: (ChronoFolder | ChronoTask)[] = [];

  constructor(option?: { parent?: ChronoFolder; root?: boolean }) {
    super();

    this.type = "folder";

    if (option) {
      if (option.parent) this.parent = option.parent;
      if (option.root) this.root = option.root;
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

  parent: ChronoFolder | null = null;

  title: string = "no title";
  content: string = "no content";
  start_at: number = 0;
  end_at: number = 0;
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
}

export type ChronoTaskKeys = keyof ChronoTask;
export type ChronoTaskValues = ChronoTask[ChronoTaskKeys];

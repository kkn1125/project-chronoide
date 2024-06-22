// export class TodoModel implements Todo {
//   id!: number;
//   type!: string;
//   title!: string;
//   content!: string;
//   childrens: TodoModel[] = [];
//   directories: string[] = [];
//   group!: string;
//   order!: number;
//   start_at!: number;
//   end_at!: number;
//   duration!: number;
//   includeRest!: boolean;

//   constructor(todoRequire?: TodoRequire) {
//     const { title, content, directories, group } = todoRequire;

//     this.type = "folder";

//     this.title = title || "untitled";
//     this.content = content || "empty";
//     this.directories = directories || ["root"];

//     this.childrens = [];

//     this.group = group || "no group";
//     this.order = -1;
//     this.start_at = 0;
//     this.end_at = 0;
//     this.duration = 0;
//     this.includeRest = false;
//   }

//   addChildren(todo: TodoModel) {
//     this.childrens = [...this.childrens, todo];
//   }

//   typeFolder() {
//     this.type = "folder";
//   }

//   typeFile() {
//     this.type = "file";
//   }

//   typeToggle() {
//     if (this.type === "file") {
//       this.type = "folder";
//     } else {
//       this.type = "file";
//     }
//   }
// }

export const createTodo = ({
  id = 0,
  type = "folder",
  title = "no title",
  content = "no content",
  childrens = [],
  directories = [],
  group = "no group",
  order = -1,
  start_at = 0,
  end_at = 0,
  duration = 0,
  includeRest = false,
}: Partial<Todo>) => ({
  id,
  type,
  title,
  content,
  childrens,
  directories,
  group,
  order,
  start_at,
  end_at,
  duration,
  includeRest,
});

/* [
  {
    id: 1,
    type: "folder",
    title: "test",
    content: "test content",
    directories: ["root", "main"],
    group: "",
    order: -1,
    start_at: null,
    end_at: null,
    duration: 0,
    childrens: [
      {
        id: 2,
        type: "file",
        title: "test",
        content: "test content",
        directories: ["root", "main"],
        group: "",
        order: -1,
        start_at: null,
        end_at: null,
        duration: 0,
        childrens: [],
        includeRest: false,
      },
      {
        id: 2,
        type: "file",
        title: "test",
        content: "test content",
        directories: ["root", "main"],
        group: "",
        order: -1,
        start_at: null,
        end_at: null,
        duration: 0,
        childrens: [
          {
            id: 2,
            type: "file",
            title: "test",
            content: "test content",
            directories: ["root", "main"],
            group: "",
            order: -1,
            start_at: null,
            end_at: null,
            duration: 0,
            childrens: [],
            includeRest: false,
          },
        ],
        includeRest: false,
      },
      {
        id: 2,
        type: "file",
        title: "test",
        content: "test content",
        directories: ["root", "main"],
        group: "",
        order: -1,
        start_at: null,
        end_at: null,
        duration: 0,
        childrens: [],
        includeRest: false,
      },
    ],
    includeRest: false,
  },
] */

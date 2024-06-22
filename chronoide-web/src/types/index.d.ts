export declare global {
  export interface NavigateOption {
    name: string;
    path: string;
  }
  export type TodoState = Todo[];
  export interface Todo {
    id: number;
    type: string;
    title: string;
    content: string;
    childrens: Todo[];
    /* 폴더 */
    directories: string[];
    /* 그룹 */
    group: string;
    /* 우선순위 */
    order: number;
    /* 기간 옵션 */
    start_at: number;
    end_at: number;
    duration: number;
    /* 주말 포함 여부 true: 포함, false: 제외 default: false*/
    includeRest: boolean;
  }
  export interface TodoRequire {
    title?: string;
    content?: string;
    directories?: string[];
    group?: string;
  }
}

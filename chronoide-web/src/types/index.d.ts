export declare global {
  export interface BaseNavigateOption {
    name: string;
  }
  export interface NavigateOption extends BaseNavigateOption {
    path: string;
  }
  export interface NavigateActOption extends BaseNavigateOption {
    action: () => void;
  }
  export type TodoState = Chrono[];
  export interface Chrono {
    id: number;
    type: string;
    title: string;
    content: string;
    childrens: Chrono[];
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
  export interface ChronoRequire {
    title?: string;
    content?: string;
    type?: string;
    directories?: string[];
    group?: string;
  }
}

export const STORAGE_NAME = "chronoide-local";

export const API_HOST = import.meta.env.VITE_API_HOST;
export const API_PORT = +(import.meta.env.VITE_API_PORT || 3000);
export const API_BASEPATH = import.meta.env.VITE_API_BASEPATH;

export const Path = {
  ApiHost: API_HOST,
  ApiPort: API_PORT,
  ApiBasepath: API_BASEPATH,
  ApiPath: `http://${API_HOST}:${API_PORT}/${API_BASEPATH}`,
} as const;
export type Path = (typeof Path)[keyof typeof Path];

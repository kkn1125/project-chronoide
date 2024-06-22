import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import path from "path";
import dotenv from "dotenv";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.

  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });

  const env = loadEnv(mode, process.cwd(), "");

  const host = process.env.HOST;
  const port = +(process.env.PORT || 5000);

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host,
      port,
    },
    plugins: [react()],
  };
});

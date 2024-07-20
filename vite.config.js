import { defineConfig, loadEnv } from "vite";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  process.env.BROWSER = loadEnv(mode, process.cwd(), "").BROWSER || "none";
  process.env.BROWSER_ARGS =
    loadEnv(mode, process.cwd(), "").BROWSER_ARGS || "";

  return {
    server: {
      open: true,
    },
    css: {
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
  };
});

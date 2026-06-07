import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const child = spawn(
  "npx",
  ["tsx", join(projectRoot, "src/lib/seed.ts")],
  { stdio: "inherit", shell: true, cwd: projectRoot }
);

child.on("exit", (code) => process.exit(code ?? 0));

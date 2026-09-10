import { spawnSync } from "node:child_process";

const run = (script: "db:migrate" | "build") => {
  const result = spawnSync(process.execPath, ["run", script], { stdio: "inherit" });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${script} failed with exit code ${result.status ?? "unknown"}.`);
  }
};

//run("db:migrate");
//run("build");
//console.log("Deployment build is ready.");

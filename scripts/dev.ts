const api = Bun.spawn(["bun", "--watch", "server/index.ts"], {
  stdout: "inherit",
  stderr: "inherit",
});

const web = Bun.spawn(["bunx", "vite"], {
  stdout: "inherit",
  stderr: "inherit",
});

const stop = () => {
  api.kill();
  web.kill();
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);

const exitCode = await Promise.race([api.exited, web.exited]);
stop();
process.exit(exitCode);

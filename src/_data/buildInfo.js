import { execSync } from "node:child_process";
import Eleventy from "@11ty/eleventy";
import * as os from "node:os";

let hash = execSync("git rev-parse HEAD").toString().trim();
const commit = execSync("git log -1 --oneline").toString().trim();
const branch = execSync("git branch --show-current").toString().trim();

export default function () {
  const now = new Date();
  const timeZone = "UTC";
  const buildTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone,
  }).format(now);

  return {
    time: {
      raw: now.toISOString(),
      formatted: `${buildTime} ${timeZone}`,
    },
    hash: hash,
    commit: commit,
    branch: branch,
    eleventyVersion: Eleventy.getVersion(),
    host: `${os.type()} (${os.platform()})`,
    nodeVersion: process.version,
  };
}

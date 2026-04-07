import { execSync } from "node:child_process";
import Eleventy from "@11ty/eleventy";
import * as os from "node:os";

const hash = execSync("git rev-parse HEAD").toString().trim();
const hash_short = execSync("git rev-parse --short HEAD").toString().trim();
const commit = execSync("git log -1 --oneline").toString().trim().slice(8); // grab the commit message
const branch = execSync("git branch --show-current").toString().trim();

export default function () {
  const now = new Date();

  return {
    time: now.toISOString().slice(0, 10),
    hash: hash,
    hash_short: hash_short,
    commit: commit,
    branch: branch,
    eleventyVersion: Eleventy.getVersion(),
    host: `${os.type()} (${os.platform()})`,
    nodeVersion: process.version,
  };
}

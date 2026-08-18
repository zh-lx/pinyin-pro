import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "..");
const entry = path.join(root, "dist/index.mjs");

fs.writeFileSync(entry, "export * from './esm/index.mjs';\n", "utf8");
console.log(`Created ${entry}`);

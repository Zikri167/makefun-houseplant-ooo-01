// The Houseplant Out-of-Office — make.fun program/v1 entry.
// Writes one out-of-office auto-reply, as if a houseplant sent it,
// to MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt when unset).
// Node 22, stdlib only, deterministic, offline, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "Auto-reply: I'm the fern in the corner. Unwatered since March, I'm growing toward the door. Goodbye, probably.";

function validate(text: string): void {
  const chars = Array.from(text);
  if (chars.length < 1 || chars.length > 120) {
    throw new Error(`reply must be 1-120 characters, got ${chars.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("reply must not be whitespace-only");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("reply must be a single line");
  }
}

function main(): void {
  validate(REPLY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
}

main();

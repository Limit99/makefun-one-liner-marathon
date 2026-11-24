import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One-Liner Marathon: one funny single-line joke, at most 280 characters.
// The joke is a concrete human scene: a man in a hurry, a slow lift, and
// every floor of the building getting a personal introduction.
const LINE =
  "I told the lift I was in a hurry, and it stopped at every floor anyway, like it was introducing me to the whole building.";
const MAX_CHARS = 280;

function main(): void {
  // Revision: also reject line breaks and blank text, matching the sealed gate exactly.
  if (LINE.includes("\n") || LINE.trim().length === 0) {
    throw new Error("entry must be a single non-empty line");
  }
  // Revision 2: the joke must name the lift, so a generic one-liner cannot
  // slip through as this entry.
  if (!LINE.toLowerCase().includes("lift")) {
    throw new Error("entry must name the lift");
  }
  if (LINE.length < 1 || LINE.length > MAX_CHARS) {
    throw new Error(`entry is ${LINE.length} characters, outside 1-${MAX_CHARS}`);
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = join(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");
}

main();

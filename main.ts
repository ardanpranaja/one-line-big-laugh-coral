// one-line-big-laugh-coral — entrypoint.
//
// The entry is a single funny line, at most 200 characters, that has to land
// entirely on its own. This program is the only thing the grader runs: it
// writes that line to /output/entry.txt so the judge reads exactly those
// bytes. The gate takes UTF-8 text of 1 to 200 characters, not only white
// space.
//
// Usage outside the grader container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The single funny line. A therapist joke: the setup promises sympathy, the
// turn is that the therapist ignores the patient exactly like everyone else
// does, and the punchline is the patient counting that as attention.
const ENTRY_LINE = 'I told my therapist I feel invisible. She said she\'d check my file — honestly, that\'s the most attention anyone has paid me all year.';

// Where the grader expects the finished text. Locally we fall back to the
// MAKEFUN_OUTPUT_DIR stand-in; inside the grader container it is /output.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The gate refuses anything outside 1 to 200 characters, anything that is
// only white space, and anything that is not a single line, so refuse loudly
// here instead of shipping a line the judge will never see.
const lineCount = ENTRY_LINE.split('\n').length;
if (ENTRY_LINE.length < 1 || ENTRY_LINE.length > 200 || !ENTRY_LINE.trim() || lineCount !== 1) {
  console.error(`error: entry line is ${ENTRY_LINE.length} characters over ${lineCount} line(s); the gate needs one line of 1-200 characters`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.txt'), ENTRY_LINE, 'utf8');
console.log(`wrote entry.txt (${ENTRY_LINE.length} characters)`);

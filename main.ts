import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One line of awkward small talk from one robot to another in an elevator.
// The joke: a robot at 4% battery is trapped in forced politeness with a
// robot at 97%, so both pretend the floor numbers are fascinating instead
// of naming the gap — then it lands the classic small-talk line, except
// robots can only simulate the weather.
const ENTRY =
  "So… my battery is at 4%, yours is at 97%, and we are both going to stare at the floor numbers instead. Nice weather we're simulating.";

if (ENTRY.trim().length === 0) {
  throw new Error("entry is empty or only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, over the 200 limit`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Round-trip check: what was written must be byte-identical to the entry.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("entry.txt does not match the entry");
}

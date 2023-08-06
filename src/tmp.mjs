import { dummyNotes } from "./dummy_notes.js";
import fs from 'fs';

console.log(dummyNotes.length);

dummyNotes.forEach((item, i) => (item.id = i + 1));

fs.writeFileSync('./output.js', 'export const dummyNotes =' + JSON.stringify(dummyNotes));

var obj = {
    name: "Mmk",
};
let stringObj = JSON.stringify(obj);

console.log(stringObj);

let personString = '{"name":"kk","age":45}';
console.log(JSON.parse(personString));

const fs = require("fs");

const originalBody = {
    title: "mmk the beast",
    body: "any body",
};
// write to the file
let originalNoteString = JSON.stringify(originalBody);

fs.writeFileSync("notes.json", originalNoteString);

let noteString = fs.readFileSync("notes.json");

let note = JSON.parse(noteString);
console.log(note);

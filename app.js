const fs = require("fs");
const notes = require("./note");
const yargs = require("yargs");

const titleOptions = {
    describe: "Title of note",
    demand: true,
    alias: "t",
};
const bodyOptions = {
    describe: "Body of note",
    demand: true,
    alias: "b",
};

const argv = yargs
    .command("add", "Add a new note", {
        title: titleOptions,
        body: bodyOptions,
    })
    .command("list", "List all notes")
    .command("read", "Read a note", {
        title: titleOptions,
    })
    .command("remove", "Remove a note", {
        title: titleOptions,
    })
    .help().argv;

var command = argv._[0];
console.log("Command: ", command);
console.log("Yargs", argv);

if (command === "add") {
    let result = notes.addNote(argv.title, argv.body);
    if (result === "Title alredy exist") {
        console.log("Title alredy exist");
    } else {
        console.log("Notes added suceessful");
    }
} else if (command === "list") {
    let allNotes = notes.getAll();
    if (allNotes && allNotes.length > 0 && allNotes != "File does not exist") {
        console.log("Numbers of Entries:" + allNotes.length);
        allNotes.forEach((value) => {
            console.log(`Title: ${value.title} ,Body:${value.body}`);
        });
    } else if (allNotes === "File does not exist") {
        console.log(allNotes);
    } else {
        console.log("No Data Found");
    }
} else if (command === "read") {
    let result = notes.getNote(argv.title);
    if (result === "Title does not exist" || result === "File does not exist") {
        console.log(result);
    } else {
        console.log("Data Found");
        console.log(`Title: ${result[0].title}`);
        console.log(`Body: ${result[0].body}`);
    }
} else if (command === "remove") {
    let result = notes.removeNote(argv.title);
    if (result) {
        console.log(result);
    } else {
        console.log("File remove sucessful");
    }
} else {
    console.log("Command not recognized");
}

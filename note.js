console.log("Starting notes.js");

const fs = require("fs");
const filePath = "notes-data.json";

let fetchNote = () => {
    try {
        var notesString = fs.readFileSync(filePath);
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync(filePath, JSON.stringify(notes));
};

let readNote = () => {
    let info = fs.statSync(filePath);
    if (info.size > 0) {
        let data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } else {
        return [];
    }
};

let fileCheck = (filePath) => {
    if (fs.existsSync(filePath)) {
        // path exists
        return true;
    } else {
        return false;
    }
};
let addNote = (title, body) => {
    //get data first and check
    try {
        var notes = fetchNote();
        var note = {
            title,
            body,
        };
        let fileData = readNote();
        var duplicateNotes = fileData.filter((note) => note.title === title);

        if (duplicateNotes.length === 0) {
            notes.push(note);
            saveNotes(notes);
        } else {
            return "Title alredy exist";
        }
    } catch (error) {
        console.error(error);
    }
};

let getAll = () => {
    console.log("Getting all notes");
    try {
        if (fileCheck(filePath)) {
            let fileData = readNote();
            console.log(fileData);
            return fileData;
        } else {
            return "File does not exist";
        }
    } catch (error) {
        console.error(error);
    }
};

let getNote = (title) => {
    try {
        if (fileCheck(filePath)) {
            let fileData = readNote();

            var duplicateNotes = fileData.filter((note) => note.title === title);
            if (duplicateNotes.length > 0) {
                return duplicateNotes;
            } else {
                return "Title does not exist";
            }
        } else {
            return "File does not exist";
        }
    } catch (error) {
        console.error(error);
    }
};

let removeNote = (title) => {
    try {
        //check the file exist
        if (fileCheck(filePath)) {
            let fileData = readNote();

            var duplicateNotes = fileData.filter((note) => note.title === title);
            if (duplicateNotes.length > 0) {
                let filterData = fileData.filter((note) => note.title != title);
                saveNotes(filterData);
            } else {
                return "Title does not exist";
            }
        } else {
            return "File does not exist";
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
};

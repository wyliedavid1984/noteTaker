const util = require('util')
const fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
const path = require('path');

const dbPath = path.join(__dirname, "../../../db/db.json");

// This module creates an id so we can select each note when removing them from the htm page.
class Storage {

    readfile() {
        return readFileAsync(dbPath, "utf8")
    }

    writefile = (data) => {
        return writeFileAsync(dbPath, JSON.stringify(data));
    }
    getDB = () => {
        return this.readfile().then((note) => {
            let newNotes;
            try {
                newNotes = [].concat(JSON.parse(note))
            } catch (err) {
                newNotes = []
            }

            return newNotes;
        })

    }
    addToDB(note) {
        const {
            title,
            text
        } = note;

        if (!title || !text) {
            throw new Error("Note 'title' and 'text' are required")
        }

        const newNote = {
            title,
            text,
            id: uuidv4()
        }

        return this.getDB()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.writefile(updatedNotes))
            .then(() => newNote)
    }
    
removeFromDB(id) {

    let newNotes

    return this.getDB()
        .then((notes) => {
            newNotes = notes.filter((note) => note.id !== id)
            return newNotes
        })
        .then((updatedNotes) => this.writefile(updatedNotes))
        .then(() => newNotes)
}
}
module.exports = new Storage();
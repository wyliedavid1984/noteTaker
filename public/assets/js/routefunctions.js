const util = require('util')
const fs = require('fs');
const path = require('path');
const {
    v4: uuidv4
} = require('uuid');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

// path to db json
const dbPath = path.join(__dirname, "../../../db/db.json");

// This module creates an id so we can select each note when removing them from the htm page.
class Storage {
    
    // read files from data base
    readfile() {
        return readFileAsync(dbPath, "utf8")
    }

    // write files to data base
    writefile = (data) => {
        return writeFileAsync(dbPath, JSON.stringify(data));
    }

    // this got our mock data base 
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

    // add to our mock data base by using the note from user
    addToDB(note) {
        // setting user input to title and text
        const {
            title,
            text
        } = note;

        // throw error in case user got past front end and didn't enter both fields of data
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' are required")
        }
        // setting user input and adding id
        const newNote = {
            title,
            text,
            id: uuidv4()
        }
        // updating data base, and then rewriting file and returning it
        return this.getDB()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.writefile(updatedNotes))
            .then(() => newNote)
    }
    
    // delete the selected note from the mock data base
    removeFromDB(id) {
        // set variable to use later when saving filter method
        let newNotes
        // get data base then removing selected note by id, after rewriting data base and returning it.
        return this.getDB()
            .then((notes) => {
                newNotes = notes.filter((note) => note.id !== id)
                return newNotes
            })
            .then((updatedNotes) => this.writefile(updatedNotes))
            .then(() => newNotes)
    }
}
// exporting all functions in a single class and creating it so we only need to call the variable.
module.exports = new Storage();
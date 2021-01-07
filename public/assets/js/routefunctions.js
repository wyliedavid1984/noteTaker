const util = require('util')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
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


}
module.exports = new Storage();
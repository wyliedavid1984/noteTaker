// built in modules
const {
    rejects
} = require('assert');
const express = require('express')
const fs = require('fs');
const {
    resolve
} = require('path');
const path = require('path')
const util = require('util')
// created modules
const addId = require("../public/assets/js/createId");


//file path
const dbPath = path.join(__dirname, '../db/db.json')

// express app
const router = express.Router();

// global variable
let db = JSON.parse(fs.readFileSync(dbPath))
const writeFileAsync = util.promisify(fs.writeFile)

// middleware to get data from post
router.use(express.urlencoded({
    extended: true
}))
router.use(express.json())
router.use(express.static('public'));

// getting old notes
router.get("/api/notes", (req, res) => {
    //grabbing the json object to display 
    res.json(db)
    //ending response so it don't continue
    res.end()
})

// posting notes
router.post('/api/notes', (req, res) => {
    // grabbing user input
    const note = req.body
    // adding to db array
    db.push(note);
    // adding id to db
    addId(db)
    //writing new file to db.json with new user input
    writeFileAsync(dbPath, JSON.stringify(db), (err) => {
        err ? console.log(err) : console.log("write success")
    })
    // ending response
    res.json(db)

})

// deleting notes
router.delete("/api/notes/:id", (req, res) => {
    console.log("delete request")
    // set variable to id of selected object.
    const id = parseInt(req.params.id);
    // filtering out selected id and return new array
    let p = new Promise((resolve, reject) => {
        const newNotes = db.filter((note) => note.id !== id)
        if (newNotes.length > 1) {
            resolve(newNotes)
        } else {
            reject('Failed')
        }
    })
    p.then((newNotes) => {
        // writing new array to db.json file
        writeFileAsync(dbPath, JSON.stringify(newNotes))
            .then(() => {
                console.log("end of delete request")
            }).catch((err) => {
                console.error(err)
            })
    })

    // ending response
    res.json(db)
    res.end()
})

module.exports = router;
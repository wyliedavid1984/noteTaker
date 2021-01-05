//modules
const express = require('express')
const fs = require('fs')
const path = require('path')
const addId = require("../public/assets/js/createId");


//file path
const dbPath = path.join(__dirname, '../db/db.json')

// express app
const router = express.Router();

// global variable
const db = JSON.parse(fs.readFileSync(dbPath))

// middleware to get data from post
router.use(express.urlencoded({
    extended: true
}))
router.use(express.json())
router.use(express.static('public'));

// getting old notes
router.get("/api/notes", (req, res) => {

    console.log(db);
    res.json(db)
    res.end()
})

// posting notes
router.post('/api/notes', (req, res) => {
    const note = req.body

    db.push(note);
    addId(db)
    console.log(db)
    fs.writeFileSync(dbPath, JSON.stringify(db), (err) => {
        err ? console.log(err) : console.log("write success")
    })
    res.end()
})

// deleting notes
router.delete("/api/notes/:id", (req, res) => {

    const id = req.params.id;
    console.log(id)

    const newDb = db.filter(id)
    res.end(newDb)
})

module.exports = router;
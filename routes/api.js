//modules
const express = require('express')
const fs = require('fs')
const path = require('path')
const {
    v4: uuidv4
} = require('uuid');


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

// getting old notes
router.get("/api/notes", (req, res) => {

    res.json(db)
})

// posting notes
router.post('/api/notes', (req, res) => {
    const note = req.body
      note += id.uuidv4();
      console.log(note)
    db.push(note);
    

    fs.writeFileSync(dbPath, JSON.stringify(db), (err) => {
        err ? console.log(err) : console.log("write success")
        res.end()
    })


})

// deleting notes
router.delete("/api/notes/:id", (req, res) => {

    const id = req.params.id;

    notes.filter(id)
        .then(result => {
            res.json({
                // res.redirect('/notes')
            });
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;
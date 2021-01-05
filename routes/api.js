//modules
const express = require('express')
const fs = require('fs')
const path = require('path')


//file path
const dbPath = path.join(__dirname, '../db/db.json')

// express app
const router = express.Router();


// middleware to get data from post
router.use(express.urlencoded({
    extended: true
}))
router.use(express.json())

//variable
let db =fs.readFile(dbPath, "utf8", (err, data) => {
        err ? console.log(err) : console.log("read success")
        JSON.stringify(data)
    })

// getting old notes
router.get("/api/notes", (req, res) => {

    const note = fs.readFile(dbPath, "utf8", (err, data) => {
        err ? console.log(err) : console.log("read success")
        res.json(JSON.parse(data))
    })
})

// posting notes
router.post('/api/notes', (req, res) => {
    
    db.push(req.body)

    const newNote = fs.writeFile(dbPath, JSON.stringify(note), (err) => {
        err ? console.log(err) : console.log("write success")
        res.end()
    })


})

// deleting notes
router.delete("/api/notes/:id", (req, res) => {

    const id = req.params.id;

    notes.findByIdAndDelete(id)
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
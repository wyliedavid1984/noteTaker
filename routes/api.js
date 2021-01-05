const express = require('express')
const fs = require('fs')
const path = require('path')
const dbjson = require('../db/db.json');

// express app
const router = express.Router();

// middleware to get data from post
router.use(express.urlencoded({extended: true}))

// getting old notes
router.get("/api/notes", (req, res) => {
    const note = fs.readFile("../db/db.json")
     res.json(note)
    
})
// posting notes
router.post('/api/notes', (req, res) => {
    const newNote = req.body   
    const note = fs.appendFile('../db/db.json', newNote, (err)=>{
        err ? console.log(err): console.log("success")
    })
    res.json(note)
})



// deleting notes
router.delete("/api/notes/:id", (req, res) => {

    const id = req.params.id;

    notes.findByIdAndDelete(id)
        .then(result => {
            res.json({
                res.redirect('/notes')
            });
        })
        .catch((err) => {
            console.log(err);
        })
})

module.exports = router;
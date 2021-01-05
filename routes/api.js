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
    fs.writeFileSync(dbPath, JSON.stringify(db), (err) => {
        err ? console.log(err) : console.log("write success")
    })

    // ending response
    res.end()
})

// deleting notes
router.delete("/api/notes/:id", (req, res) => {
    // set variable to id of selected object.
    const id = req.params.id;
    console.log(id)
    console.log(db)
    db.splice(id, 1)
    console.log(db)
    fs.writeFileSync(dbPath, JSON.stringify(db), (err)=>{
        err ? console.log(err): console.log("delete success")
    } )
   
    res.end()
})

module.exports = router;
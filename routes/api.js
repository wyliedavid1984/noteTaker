//modules
const express = require('express')
const fs = require('fs')
const path = require('path')

//file path
const dbPath = path.join(__dirname, '../db/db.json')

// express app
const router = express.Router();


// middleware to get data from post
router.use(express.urlencoded({extended: true}))
router.use(express.json())

// getting old notes
router.get("/api/notes", (req, res) => {

    const note = fs.readFile(dbPath, (err) =>{
        err ? console.log(err): console.log("read success")
    })

     res.end(note)

})

// posting notes
router.post('/api/notes', (req, res) => {
    const newNote = req.body
       
    const note = fs.writeFile(dbPath, JSON.stringify(newNote), (err)=>{
        err ? console.log(err): console.log("success")
    })
    
    res.end(note)
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
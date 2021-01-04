const express = require('express')
const fs = require('fs')
const path = require('path')

// express app
const router = express.Router();
// port from Heroku or set port to 3000
const PORT = process.env.PORT || 3000;
// create paths
const public = path.join(__dirname, "../public")
const indexPage = path.join(public, '/views/index.html');
const notesPage = path.join(public, './views/notes.html');
const errorPage = path.join(public, './views/404.html');


router.delete("/api/notes/:id", (req, res) => {

    const id = req.params.id;
    notes.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect: '/notes'
            });
        })
        .catch((err) => {
            console.log(err);
        })
})
module.exports = router;
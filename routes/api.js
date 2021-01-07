// built in modules
const { json } = require('express');
const express = require('express')
const fs = require('fs');
// created modules
const storage = require("../public/assets/js/routefunctions");

// express app
const router = express.Router();

// middleware to get data from post
router.use(express.urlencoded({
    extended: true
}))
router.use(express.json())
router.use(express.static('public'));

// getting old notes
router.get("/api/notes", (req, res) => {
   storage
   .getDB()
   .then((notes) => res.json(notes))
   .catch((err) => res.status(500).json(err))
})



module.exports = router;
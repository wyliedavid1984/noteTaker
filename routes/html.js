// modules 
const express = require('express')
const path = require('path')

// express app
const router = express.Router();

// create paths
const public = path.join(__dirname, "../public")
const indexPage = path.join(public, '/views/index.html');
const notesPage = path.join(public, './views/notes.html');
const errorPage = path.join(public, './views/404.html');

router.get('/', (req, res) => {

    res.status(200).sendFile(indexPage);
});

router.get('/notes', (req, res) => {

    res.status(200).sendFile(notesPage);
});



router.use((req, res) => {

    res.status(404).sendFile(errorPage);
});


module.exports =  router; 
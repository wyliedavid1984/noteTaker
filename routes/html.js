// modules 
const express = require('express')
const path = require('path')
const apiRoutes = require('./api');

// express app
const router = express.Router();

// creating paths
const public = path.join(__dirname, "../public")
const indexPage = path.join(public, '/views/index.html');
const notesPage = path.join(public, '/views/notes.html');
const errorPage = path.join(public, '/views/404.html');

// middleware
router.use(apiRoutes)

// notes page
router.get('/notes', (req, res) => {
    res.status(200).sendFile(notesPage);
});

// index pages I added this in later and just decided to keep the 404 page works fine. if you change the * to a /
router.get('*', (req, res) => {
    res.status(200).sendFile(indexPage);
});

// 404 page
router.use((req, res) => {
    res.status(404).sendFile(errorPage);
});

module.exports =  router; 
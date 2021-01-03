const express = require('express')
const fs = require('fs')
const path = require('path')

// express app
const app = express();
// port from Heroku or set port to 3000
const PORT = process.env.PORT || 3000;
// create paths
const index = path.join(__dirname, '/views/index.html');
const notes = path.join(__dirname, './views/notes.html');
const page404 = path.join(__dirname, './views/404.html') 

app.get('/', (req, res) =>{
   
   res.status(200).sendFile(index)    
})

app.get('/notes', (req, res) => {

    res.status(200).sendFile(notes)
})

app.use((req, res)=> {

    res.status(404).sendFile(page404)
})

//listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
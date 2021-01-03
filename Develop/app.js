const express = require("express")

// express app
const app = express();

//listen for requests
app.listen(3000);

app.get("/", (req, res) =>{
    
    res.status(200).sendFile("./views/index.html", { root: __dirname })
})

app.get("/notes", (req, res) => {

    res.status(200).sendFile("./views/notes.html", { root: __dirname })
})

app.use((req, res)=> {

    res.status(404).sendFile("./views/404.html", { root: __dirname })
})
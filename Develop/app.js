const express = require("express")

// express app
const app = express();
// port or set port to 3000
const PORT = process.env.PORT || 3000;


app.get("/", (req, res) =>{
   
   res.status(200).sendFile("./views/index.html", { root: __dirname })    
})

app.get("/notes", (req, res) => {

    res.status(200).sendFile("./views/notes.html", { root: __dirname })
})

app.use((req, res)=> {

    res.status(404).sendFile("./views/404.html", { root: __dirname })
})

//listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
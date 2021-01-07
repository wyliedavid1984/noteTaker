const express = require('express');
const htmlRoutes = require('./routes/html');
const apiRoutes = require('./routes/api');



// express app
const app = express();
// middleware 
app.use(express.static('public'))

// port from Heroku or set port to 3000
const PORT = process.env.PORT || 3000;

// create paths
app.use(apiRoutes)
app.use(htmlRoutes)

//listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
const express = require('express')
const htmlRoutes = require('./routes/html');

// express app
const app = express();

// port from Heroku or set port to 3000
const PORT = process.env.PORT || 3000;

// create paths
app.use(htmlRoutes)

//listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
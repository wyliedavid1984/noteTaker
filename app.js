const express = require('express')
const Routes = require('./routes/html');

// express app
const app = express();
app.use(express.static('public'))

// port from Heroku or set port to 3000
const PORT = process.env.PORT || 3000;

// create paths
app.use(Routes)

//listen for requests
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
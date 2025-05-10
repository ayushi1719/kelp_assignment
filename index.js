const express = require("express");
const app = express();
const router = require('./src/routes/routes.js'); // Importing router module
require('dotenv').config();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use('/kelpApi', router);  // Using router module

app.listen(port, error => {
    if(error) return console.log(`Cannot listen on PORT: ${port} ->`, error)
    console.log(`Server is running on http://localhost:${port}`);
});

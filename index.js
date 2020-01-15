// implement your API here
const db = require('./data/db');

const express = require('express');

const port = 4000;

const server = express();

server.listen(port, () => {
    console.log(`This server is listening on port ${port} `);
})

server.use(express.json());

//Post /api/users
// implement your API here
const db = require('./data/db');

const express = require('express');

const port = 4000;

const server = express();

server.listen(port, () => {
    console.log(`This server is listening on port ${port} `);
})

server.use(express.json());

//Get / (testing)
server.get('/', (req, res) => {
    res.send("THIS SERVER IS ALIVE")
})

//Get /api/users
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved.", err })
        })
})

//Get /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then(user => {
            if(user === undefined){
                res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved.", err })
        })
})

//Post /api/users
server.post('/api/users', (req, res) => {
    const hubInfo = req.body;
    db.insert(hubInfo)
        .then(user => {
            if(req.body.name === ""){
                res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
            } else if(req.body.bio === ""){
                res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
            } else {
                res.status(201).json({sucess: true, message: "User created", user})
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "There was an errpr while saving the user to the database", err})
        })
})

//Delete /api/users/:id
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(user => {
            if(user === undefined) {
               res.status(404).json({ message: "The user with the specified ID does not exist." }) 
            } else {
                res.status(204).end();
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "The user could not be removed", err })
        })
})

// Put /api/users/:id
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const hubInfo = req.body;

    db.update(id, hubInfo)
        .then(user => {
            if(user === undefined) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else if(req.body.name === "") {
                res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
            } else if(req.body.bio === "") {
                res.status(500).json({ errorMessage: "Please provide name and bio for the user." })
            } else {
                res.status(200).json({sucess: true, message: "user updated", user})
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be modified.", err })
        })
})
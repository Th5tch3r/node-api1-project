// implement your API here
const db = require('./data/db.js');

const express = require('express');

const server = express();

server.listen(3000, () => {
    console.log('=== server listening on port 3000 ===');
});

server.use(express.json());

server.get('/', (req, res) => {
    res.send("This api is alive!!")
})

server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(550).json({errorMessage: "Please provide name and bio for the user.", err});
        });
});

server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)

    db.findById(id)
    .then(userID => {
        console.log(userID, id)
        if(!userID){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(userID)
        }
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({ error: "The users information could not be retrieved."})
    })
})

server.post('/api/users', (req, res) => {
    const info = req.body
    const { name, bio } = info

    if(!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    db.insert(info)
    .then(data => {
        console.log(data)
        res.status(201).json(info)
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({ error: 'failed to post data'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    db.remove(id)
    .then(count => {
        console.log(count, id)
        if(count === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json({ message: `Item with id ${id} deleted`})
        }

    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({ error: "The user could not be removed" })
    })
})

server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const info = req.body
    const { name, bio } = info

    if(!name || !bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }

    db.update(id, info)
    .then(count => {
        console.log(count)
        if(count === 0){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(info)
        }
    })
    .catch(err => {
        console.log('error', err)
        res.status(500).json({error: "The user information could not be modified."})
    })
})
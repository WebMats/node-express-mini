const express = require('express');
const db = require('./data/db');
const app = express();
const router = express.Router();
app.use(express.json());



app.use('/api/users', router);

router.post('', (req, res, next) => {
    if (!req.body.name || !req.body.bio ) {
        res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
    }
    db.insert(req.body).then((result) => {
        db.findById(result.id).then((result) => {
            res.status(201).json(result)
        }).catch((err) => {
            return new Error(err);
        });
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the user to the database." })
    });
})
router.get('', (req, res, next) => {
    db.find().then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "The users information could not be retrieved." })
    });
})
router.get('/:id', (req, res, next) => {
    db.findById(req.params.id).then((result) => {
        if (!result) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: "The user information could not be retrieved." })
    });
})
router.delete('/:id', async (req, res, next) => {
    const user = await db.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    db.remove(req.params.id).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ error: "The user could not be removed" })
    });
})
router.put('/:id', async (req, res, next) => {
    if (!req.body.name || !req.body.bio ) {
        res.status(404).json({ errorMessage: "Please provide name and bio for the user." })
    }
    const user = await db.findById(req.params.id);
    if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
    try {
        const result = await db.update(req.params.id, req.body);
        const newUser = await db.findById(req.params.id);
        if (!result || !newUser) {
            res.status(500).json({ error: "The user information could not be modified." })
        }
        res.status(200).json(newUser)
    }catch(err) {
        console.log(err)
        res.status(500).json({ error: "The user information could not be modified." })
    }
})




app.listen(4000, () => {
    console.log('Listening on port 4000...')
})
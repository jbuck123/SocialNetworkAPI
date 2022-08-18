const api_router = require('express').Router();
const User = require('../models/users')

// create the first user 
api_router.get('/user', (req, res)=> {
    User.find({}, (err, result) => {
        if(result) {
            res.status(200).json(result);
        } else {
            console.log('error something wroning');
            res.status(500).json({ message: 'something went wrong'})
        }
    })
})
// able to post to user but not find them ....
api_router.post('/user', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
    })
    newUser.save();

    res.json(newUser)
})

// find user by id 

api_router.get('/user/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId})
    .then((user) =>
    !user
        ?res.status(404).json({message: 'no user with that ID'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
})

module.exports = api_router
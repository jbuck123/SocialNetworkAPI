const api_router = require('express').Router();
const User = require('../models/users');
const Thought = require('../models/thought');
const Reaction = require('../models/reaction');

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

// delete a user and eventually his friends

api_router.delete('/user/:userId', (req, res) => {
    User
    .findByIdAndRemove({ _id: req.params.userId })
    .exec()
    .then(() => res.json({ message: 'deleted user'}))
})

// update user
api_router.put( '/user/:userId', (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.userId},
        {$set: req.body},
        { runValidators: true, new: true}
    )
    .then((application) =>
    !application
      ? res.status(404).json({ message: 'No application with this id!' })
      : res.json(application)
  )

})

//// section that will be for thoughts and reactions ..... a long ass script but it gets confusing without it 


api_router.get('/thought', (req, res)=> {
    Thought.find({}, (err, result) => {
        if(result) {
            res.status(200).json(result);
        } else {
            console.log('error something hurting me');
            res.status(500).json({ message: 'something went very bad'})
        }
    })
})

api_router.post('/thought', (req, res) => {
    const newUser = new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.email, // would this be the Id of the user?

    })
    newUser.save();

    res.json(newUser)
})
api_router.delete('/thought/thoughtId', (req, res) => {
    User
    .findByIdAndRemove({ _id: req.params.thoughtId})
    .exec()
    .then(() => res.json({ message: 'thought deleted'}))
})

api_router.put('/thought/thoughtId', (req, res) => {
    User
    .findByIdAndUpdate({ _id: req.params.thoughtId})
    .exec()
    .then(() => res.json({message: 'thought updated'}))
})




// reactions model

api_router.get('/reaction', (req, res)=> {
    Reaction.find({}, (err, result) => {
        if(result) {
            res.status(200).json(result);
        } else {
            console.log('error something wroning');
            res.status(500).json({ message: 'something went wrong'})
        }
    })
})

api_router.post('/reaction', (req, res) => {
    const newReaction = new Reaction({
        reactionBody: req.body.reactionBody,
        // username: req.body.email, // idk what to do for username
    })
    newReaction.save();

    res.json(newReaction)
})

api_router.delete('/reaction/:reactionId', (req, res) => {
   Reaction
   .findByIdAndRemove({ _id: req.params.reactionID})
   .exec() 
   .then(() => res.json({message: 'thought updated'}))
})
module.exports = api_router
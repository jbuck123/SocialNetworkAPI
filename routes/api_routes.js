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
    .select('-__v')
    .populate({path: 'thoughts', model: 'Thought'})
    .exec()
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

// get one thought

api_router.get('/thought/:thoughtId', (req, res) => {
    Thought.findOne({ _id: req.params.thoughtId})
    .select('-__v')
    .populate( 'reactions')
    .exec()
    .then((thought) =>
    !thought
        ?res.status(404).json({message: 'no thought with that ID'})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
})

api_router.post('/thought', (req, res) => {
    Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                {_id: req.body.userId},
                {$push: { thoughts: thought._id}},
                {new: true}
            );
        })
        .then((user) => {
            if(!user) {
                res.status(404)
            } else { res.json('created thought')}
        }) .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });

})
api_router.delete('/thought/thoughtId', (req, res) => {
    Thought
    .findByIdAndRemove({ _id: req.params.thoughtId})
    .exec()
    .then(() => res.json({ message: 'thought deleted'}))
})

api_router.put( '/thought/:thoughtId', (req, res) => {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        {$set: req.body},
        { runValidators: true, new: true}
    )
    .then((application) =>
    !application
      ? res.status(404).json({ message: 'There is no thought connected to that ID' })
      : res.json(application)
  )

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
    Thought.findOne({_id: req.body.thoughtId})
    .then((thought) => {
        console.log(thought)
    })
    Reaction.create(req.body)

        .then((reaction) => {
            console.log(req.body)
            return Thought.findOneAndUpdate(
                {_id: req.body.thoughtId},
                {$push: { reactions: reaction._id}},
                {new: true}
            );
        })
        .then((thought) => {
            console.log(thought)
            if(!thought) {
                res.status(404)
            } else {
             res.json('created reaction')}
        }) .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
})

api_router.delete('/reaction/:reactionId', (req, res) => {
   Reaction
   .findByIdAndRemove({ _id: req.params.reactionId})
   .exec() 
   .then(() => res.json({message: 'reaction deleted '}))
})
module.exports = api_router
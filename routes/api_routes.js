const api_router = require('express').Router();
const User = require('../models/users')
const Thought = require('../models/thought')

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

// delete a user and his friends

api_router.delete('/user/userId', (req, res) => {
    User.deleteOne({ _id: req.params.userId })
    .then(() => res.json({ message: 'deleted user'}))
})
// update user
api_router.put( '/user/userId', (req, res) => {
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

// api_router.post('/thought', (req, res) => {
//     const newUser = new Thought({
//         thoughtText: req.body.thoughtText,
//         crea: req.body.email,
//     })
//     newUser.save();

//     res.json(newUser)
// })

// module.exports = api_router
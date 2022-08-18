const {User, Thoughts } = require('../models');

module.exports = {
// get all the Users
    getUser(req, res) {
        User.find()
            // display users
            .then((users) => res.json(users))
            // catch error and display err
            .catch((err) => res.status(500).json(err));
    },

    // get user by id 
    getSingleUser(req, res) {
        // this is finding one by the URL PARAM
        // the api request will look like localhost:8080/api/users/<userid>
        User.findOne({_id: req.params.userId})
            .select('-__v') // wtf is this??
            .then((user) =>
                !user
                    ? res.status(400).json({message: 'No user with that ID'})
                    // print user 
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a course 

    createUser(req, res) {
                // this is using a req.body because the data will be instered as JSON info in insomnia .... not the URL 
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a course 

    deleteUser(req, res) {
        // just like finding one but instead of just finding it.. .its also being destroyeD!

        User.findOneAndDelete({ _id: req.params.userId})
            .then((user) => 
            !user
                ? res.status(404).json({message: 'No user with that ID'})
                // what the hell is going on here? ? ? ?
                : User.deleteMany({_id: { $in: user.friends} })
        )
            // When the user is deleted the friends attached will be deleted... but maybe not the reactions attributed to the USER
        .then(() => res.json({ message: 'User and friends deleted'}))
        .catch((err) => res.console.log(err));
    },
    // update User 

    updateUser(req,res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'no user with this id.'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    }
};
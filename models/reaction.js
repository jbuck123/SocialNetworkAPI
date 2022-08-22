const {Schema, model, SchemaTypes} = require('mongoose');
const Thought = require('../models/thought.js')


// reaction model


const reactionSchema = new Schema({
    reactionBody : {
        type: String,
        required: true,
        max: [280, 'dont type so much']
    },
    username: {
        type: String,
        required: true // this is the user 
    },
    createdAt: {
        type: Date,
        defualt: Date.now
    },

}
);

reactionSchema.pre('remove', function (next) {
    Thought.remove({reactions: this._id })
    .exec()
    next()
})

const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;


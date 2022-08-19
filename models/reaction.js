const {Schema, model, SchemaTypes} = require('mongoose');


// reaction model


const reactionSchema = new Schema({
    reactionBody : {
        type: String,
        required: true,
        max: [280, 'dont type so much']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        defualt: Date.now
    }
});

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;


const mongoose = require('mongoose');


const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        dataType: String,
        required: true,
        // needs testing but i think that this is the way to validate len
        // i think that required being set to true requires for there to be something there aka not null soo it should logic accepts only a max 
        max: [128, 'You cannot exceed the maximum character limit!']
    },
    createdAt : {
        type: Date, 
        default: Date.now
        // use a getter method to format the timestamp on query
        // code goes here
    },
    userId: {
        type: String, required: true
    },
    reactions: [{
        reactionId : {
            type: SchemaTypes.ObjectId,
            required: true
            // defualt value new objectID?
        },
        reactionBody: {
            type: String,
            required: true,
            max: [280, 'Please dont exceed character limit']
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            defualt: Date.now
        },
    }]
});

thoughtSchema.virtuals('reactionCount').get(function () {
    return this.reactions.length
})


const Thought = model('user', thoughtSchema);
// export the model

module.exports = Thought;


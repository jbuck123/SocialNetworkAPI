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
    // these are like replies 
    reactions: {
        type: Date,
        // leaving this for now

        // needs to be an Array of nested documents with the reactionSchema 
    }
})

thoughtSchema.virtuals('reactionCount').get(function () {
    this.reactions.length
})
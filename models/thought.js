const { Schema, model, SchemaTypes} = require('mongoose');


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
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
    username: {
        type: String, required: true
        // this is the user that created the reaction
    },
    reactions : [{
        type: Schema.Types.ObjectId,
        ref: 'reaction'
        // defualt value new objectID?
    }],
},
{
    id: false,
    toJSON: {
        virtuals: true,
      },
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

// why is the application getting so angry with me when I try to create a virtual?


const Thought = model('Thought', thoughtSchema);
// // export the model

module.exports = Thought;


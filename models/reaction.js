const mongoose = require('mongoose')

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        DataType: String, 
        required: true,
        max: [280, 'please dont react with so many words.......']
    },
    username: {
        DataType: String,
        required: true
    },
    createdAt : {
        DataType: Date, 
        defualt: Date.now
        // keeps asking me to use a getter method to format the timestamp on query
    }
})

// apparently this will not be a model but rather will be used as the reactions fields subducment schema in the THOUGHT MODEL


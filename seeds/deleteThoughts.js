const Thought = require('../models/thought.js')
const db = require('../config/connection')


Thought.deleteMany({})
.then(() => {
    console.log('thougts deleted')
    process.exit()
})
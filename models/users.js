const mongoose = require('mongoose');

// user model using mongoose schema 

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    lastAccessed: { type: Date, default: Date.now},
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.log(err);

User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany([
      { firstname: "James", lastname: "Buchmann" },
      { firstname: "Matt", lastname: "Onnen" },
      { firstname: "JD", lastname: "Tadlock" },
      { firstname: "Ryan", lastname: "Theilen" },
    ]);
  }
});
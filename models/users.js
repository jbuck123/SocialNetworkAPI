const mongoose = require('mongoose');
const thoughtSchema = require('./thought')

// user model using mongoose schema 
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  lastAccessed: { type: Date, default: Date.now },


//   thoughts : {[thoughtSchema]},

  // thoughts ... array of id values referencing hte thought mode;
  // friends ... array of _id values referencing the User model (self-reference)
  

  // creating a virtual which seems like a method attatched to the user model. 
  // this might look like this 
 
  
});
                            // getter
                            // needs a setter
userSchema.virtuals('friends').get(function() {
    return this.friends.length
})

const User = model('user', userSchema);
// export the model
module.exports = User;




// const User = mongoose.model('User', userSchema);

// const handleError = (err) => console.log(err);

// User.find({}).exec((err, collection) => {
//   if (collection.length === 0) {
//     User.insertMany([
//       { firstname: "James", lastname: "Buchmann" },
//       { firstname: "Matt", lastname: "Onnen" },
//       { firstname: "JD", lastname: "Tadlock" },
//       { firstname: "Ryan", lastname: "Theilen" },
//     ]);
//   }
// });
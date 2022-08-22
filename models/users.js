const {Schema, model, SchemaTypes} = require('mongoose');


// user model using mongoose schema 
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new Schema({
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


  thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'Thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }] // this is somehting i will need to ask my tutor about tomorrow
},
{
  toJSON: {
      virtuals: true,
  },
  id: false
}
);
                            // getter
                            // needs a setter
userSchema.virtual('friends_count').get(function() {
    return this.friends.length
})

const User = model('User', userSchema);
// export the model
module.exports = User;





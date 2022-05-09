const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName:String,
  username:String,
  email:String,
  password:String,
  image:String,
  birthdate:Date,
  phone:Number,
  cover : String,
  bio : String,
  isVerified : Boolean,
  level : {
    type: Number,
    default: 1
  },
  experience : {
    type: Number,
    default: 0
  },
  newLevelExperience :{
    type: Number,
    default: 30
  },
    role : { type: String, default: "User" },
    googleId : String,
  followers : [{type: Schema.Types.ObjectID, ref: 'User'}],
  products : [{type: Schema.Types.ObjectID, ref: 'Product'}]
});

// //Remove refreshToken from the response
// userSchema.set("toJSON", {
//     transform: function (doc, ret, options) {
//         delete ret.refreshToken
//         return ret
//     },
// })

module.exports = mongoose.model('User', userSchema);

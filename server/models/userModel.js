import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import confirmationEmailSender from "../utils/email-sender.js";

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "The first name is required!"],
    trim: true,
    minLength: 3,
    maxLength: 8,
  },
  lastName: {
    type: String,
    required: [true, "The last name is required!"],
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "The email is required!"],
    validate: [validator.isEmail, "Email is not valid!"],
    unique: true,
  },
  posts: [],
  verified:{
    type: Boolean,
    default: false
  },
 
  favorites : [{type:mongoose.Schema.Types.ObjectId, ref:'Post'}],
  password: {
    type: String,
    required: [true, "The password is required!"],
    minLength: 4,
  },
//   confirmPassword: {
//     type: String,
//     required: [true, "Confirm your password!"],
//     validate: {
//       validator: function (val) {
//         console.log(this.password);
//         return val === this.password;
//       },
//       message: "Password do not match!",
//     },
//   },

});

userSchema.post('save', async function(doc,next){

  // I will build some kind of logic inside the post hook that
  // When user record is successfully created on the data base
  // Send an email on his provided email address in this post hook
  // To confirm his email
await confirmationEmailSender(doc, next)


})




userSchema.pre("save", function (next) {
  console.log('Second Pre')
  
  this.firstName =
  this.firstName.charAt(0).toUpperCase() +
  this.firstName.slice(1).toLowerCase();
  this.lastName =
  this.lastName.charAt(0).toUpperCase() +
  this.lastName.slice(1).toLowerCase();
  next();
});

userSchema.pre("save", function (next) {
  console.log('First pre')
   this.confirmPassword = undefined
  next();
});
//  create jwt using method
userSchema.methods.generateToken = function(payload,secret){
  const token = jwt.sign(payload, secret, {
    expiresIn: 3600,
  });
 return token;
}

userSchema.methods.hashPassword = async function(password,salt){

  const hash = await bcrypt.hash(password,salt) ;
  return hash
}

const userModel = new mongoose.model("User", userSchema);
/* export default mongoose.model('User', userSchema) */

export default userModel;

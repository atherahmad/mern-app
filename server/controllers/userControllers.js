import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import { validationResult } from "express-validator";

export const loginHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });


    if (!user) {
      //return res.status(200).send(user);
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        const error = new Error("Invalid Credentials");
        error.statusCode = 401;
        throw error;
      }

    //  Another condition to check either the user has confirmed his email address or not
    // If he has not confirmed we will throw an error that please confirm your email address first
    // We will not generate the token at all in this condition and return back out of the controller
      if(!user.verified){
        const error = new Error('Please confirm your email first')
        error.statusCode = 403
        throw error 
      }

      // password correct 
      const payload = {
        email: user.email,
        firstName: user.firstName,
        userId: user._id,
      };
      // const token = jwt.sign(payload, process.env.SECRET_KEY, {
      //   expiresIn: 3600,
      // });
      const token = user.generateToken(payload,process.env.SECRET_KEY);
      res.cookie('mern-cookie',token, {
        sameSite: 'none',
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        secure: true,
        domain:'https://mern-app-fe.onrender.com'
    })

      return res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        _id: user._id,
        token
      });
    }
  } catch (error) {
    next(error);
  }
};
export const registrationHandler = async (req, res, next) => {
  console.log(req.body);
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res
    //     .status(422)
    //     .json({ errors: errors.array().map((err) => err.msg) });
    // }

    const { firstName, lastName, email, password } = req.body;

    const alreadyRegistered = await User.findOne({ email });
    if (alreadyRegistered) {
      const error = new Error("This email is already registered");
      error.statusCode = 409;
      throw error;
    }
    const saltRound = 10;
    //const hashedPassword = await bcrypt.hash(password, saltRound);
    
    const user = new User({
      firstName,
      lastName,
      email,
      password: '',
    });
    user.password = await user.hashPassword(password,saltRound);

    const result = await user.save();

    // AFTER STORING DATA ON DATABASE

    /*     if(req.body.password != req.body.confirmPassword){
      const error = new Error('Password Don not  match')
      error.statusCode =  400
      throw error
    }
    delete req.body.confirmPassword */
    //const result = await User.create(req.body);
    if (result) {
      res.status(201).json(result);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await User.find().select("-password ");
    // .limit(2)
    // .sort("firstName");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

export const favoriteHandler = async (req, res, next) => {
  try {
    const { userId, postId } = req.body;
    console.log(req.body);
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $push: { favorites: postId },
      },
      { new: true }
    );
    if (result) res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getFavoritePosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findById(userId, { favorites: 1 }).populate(
      "favorites"
    );
    res.status(200).json(result.favorites);
  } catch (err) {
    next(err);
  }
};


export const emailConfirmationHandler = async (req, res, next) => {

  try{
    const {token} = req.params
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    
    const result = await User.findByIdAndUpdate(payload.userId, {
      $set : {verified: true}
    }, {new: true})

    res.redirect('/email-confirmed')
/*     res.send('You have successfully confirmed your email') */
  }
  catch(error){
    res.redirect('/email-error')

    /* next(error) */
  }
}
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postsRoutes.js";
import cookieParser from "cookie-parser";
import identifier from "./routes/identifier.js";
import authMiddleware from './middlewares/authMiddleware.js'
import User from './models/userModel.js'

// To change our mern app into a static app

import path from 'path'
import {fileURLToPath} from 'url'

import cors from "cors";


dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../client/dist/')))

app.use(cors({ origin: ['http://localhost:5173','https://mern-app-fe.onrender.com','http://mern-app-fe.onrender.com'],credentials:true }))
app.use(cookieParser())

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/identifier", identifier);
app.use("/api/auth/verify-token",authMiddleware,async (req, res, next) => {
  try{
    const user = await User.findById(req.userId, {firstName: 1, lastName : 1, email: 1})
    if(!user){
      const error = new Error('Bad Request')
      error.statusCode = 403
    }
    res.status(200).json(user)
  }
  catch(err){
    next(err)
  }
})


/* Email confirmation end point pages */
app.get('/email-confirmed', (req, res, next) =>{
  res.sendFile(path.join(__dirname, '../client/dist', 'email-confirmed.html'))
})
app.get('/email-error', (req, res, next) =>{
  res.sendFile(path.join(__dirname, '../client/dist', 'email-error.html'))
})

// To  render the our client app from backend , that is actually the index.html in dist folder

app.get('/*', (req, res, next) =>{

  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

// Connection to the database
connectDB();

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Something went wrong";
  res.status(error.statusCode).send(error.message);
});

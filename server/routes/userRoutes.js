import express from "express";
import {
  favoriteHandler,
  getUsers,
  loginHandler,
  registrationHandler,
  getFavoritePosts
} from "../controllers/userControllers.js";
import authMiddleware from '../middlewares/authMiddleware.js'
const router = express.Router();
//import { body, validationResult } from "express-validator";

//Login
// Register

router.post("/login", loginHandler);
router.post(
  "/register",
  // [
  //   body("firstName").notEmpty().withMessage("First name is required!").trim(),
  //   body("lastName").notEmpty().withMessage("Last name is required!").trim(),
  //   body("email", "Email is required").isEmail().normalizeEmail(),
  //   body("password", "Password is required and minimum length 4 character!")
  //     .isLength({ min: 4 })
  //     .custom((val, { req }) => {
  //       if (val !== req.body.confirm_password) {
  //         throw new Error("Password don't match!");
  //       } else {
  //         return val;
  //       }
  //     }),
  // ],
  registrationHandler,
);

router.get("/getusers",getUsers);
router.put('/favorite', authMiddleware,favoriteHandler)
router.get('/favorite/:userId',authMiddleware, getFavoritePosts)

export default router;

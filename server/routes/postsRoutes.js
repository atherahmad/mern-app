import express from "express";
import {
  createPostHandler,
  getPostsHandler,
  deletePostHandler,
  postDetailHandler,
  updatePostHandler,
  createPost,
  getPosts,
} from "../controllers/postControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/create-post",authMiddleware, createPostHandler);
router.get("/get-posts", getPostsHandler);
router.delete("/delete/:postId", deletePostHandler);
router.get("/single-post/:postId", postDetailHandler);
router.patch("/update-post",authMiddleware,  updatePostHandler);

//Mongoose relationship
router.post("/createpost/:id", createPost);
router.get("/getposts/:id", getPosts);

export default router;

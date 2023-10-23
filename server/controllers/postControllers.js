import Post from "../models/postsModel.js";
import userModel from "../models/userModel.js";


export const createPostHandler = async (req, res, next) => {
  try {
    const { postTitle, postMessage, image/* , owner  */} = req.body;
    const post = new Post({
      postTitle,
      postMessage,
      image,
      owner: req.userId 
    });
    const result = await post.save();
    console.log(result);
    if (result) res.status(201).send("post created");
  } catch (error) {
    /*    console.log("error message", error.message, error.status, "finish"); */
    next(error);
  }
};
export const getPostsHandler = async (req, res, next) => {
  try {

    const allPosts = await Post.find({}, { password: 0 });

    res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
};

export const deletePostHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await Post.findByIdAndDelete(postId);
    console.log(result);
    if (result) return res.status(204).send("deleted");

    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  } catch (err) {
    next(err);
  }
};

export const postDetailHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const result = await Post.findById(postId);
    if (result) return res.status(200).json(result);

    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  } catch (err) {
    next(err);
  }
};

export const updatePostHandler = async (req, res, next) => {
  try {
    // Normally the postId should come in req.params
    const { _id, postTitle, postMessage } = req.body;
    // Previously we were not verifying on the backend either the user who is trying to update the post is an owner of the post or not
    // After implementation of the authMiddleware in /edit-post route
    // We will have access to the current logged in user's id inside the updatePostHandler
    // Now while findByIdAndUpdate method we should also pass the userId with postId to make it sure that current logged in user is the owner of that post before updating 
    // If no document found with postId is equal to provided postId and owner is equal to userId we will send not found response to the client as an error
    // e.g. Post.findOneAndUpdate({_id: _id, owner: req.userId})
    const result = await Post.findOneAndUpdate({_id:_id, owner: req.userId}, {
      postTitle,
      postMessage,
    });
    if (result) return res.status(202).json(result);

    const error = new Error("Post Not Found");
    error.statusCode = 404;
    throw error;
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { postTitle, postMessage } = req.body;
    //first find a user by ID
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    //create a post
    const post = new Post({
      postMessage,
      postTitle,
    });

    //save post
    await post.save();

    user.posts.push(post._id);

    //Save user with this post
    await user.save();
    res.status(200).json({ msg: "Post Added!" });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = [];
    const user = await userModel.findById(req.params.id);

    user.posts.forEach((id) => {
      posts.push(id.toHexString());
    });

    const allPosts = await Post.find({ _id: { $in: posts } });
    res.status(200).json(allPosts);
  } catch (error) {
    next(error);
  }
};



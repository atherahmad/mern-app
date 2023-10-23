import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postMessage: {
    type: String,
    required: true,
  },
  image: String,
  owner: {
      type: String,
      required : true
  }
});

export default mongoose.model("Post", postSchema, "Post");

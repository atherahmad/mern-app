import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  const navigate = useNavigate();
  console.log(postId);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      console.log(post);
      const response = await axios.patch(
        `${import.meta.env.VITE_BE_URL}/api/posts/update-post`,
        post,
        {
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('mern-token')}`
          }
        }
      );
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setPost((oldState) => {
      return {
        ...oldState,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BE_URL}/api/posts/single-post/${postId}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h2>Edit Your Post</h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="postTitle"
          placeholder="Post Title"
          required
          value={post.postTitle}
          onChange={changeHandler}
        />
        <div className="form-outline">
          <textarea
            className="form-control"
            name="postMessage"
            rows="4"
            placeholder="Enter your Post text"
            value={post.postMessage}
            onChange={changeHandler}
          ></textarea>
        </div>

        <input type="submit" value="Update Post" />
      </form>
    </>
  );
}

export default EditPost;

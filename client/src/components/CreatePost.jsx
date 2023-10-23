import React from "react";
import { useState } from "react";
import axios from "axios";
//import FileBase64 from "react-file-base64";

function CreatePost({ user }) {
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const post = {
        postTitle: e.target["postTitle"].value,
        postMessage: e.target["postMessage"].value,
        image: image,
/*         owner: user._id */
      };

      console.log("IMAGE: ", image);

      const token = localStorage.getItem('mern-token')
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/api/posts/create-post`,
        post,{ withCredentials: true });
      console.log(response);
      if (response.status === 201) {
        setDone(response.data);
        // alert("Created!!");
        e.target["postTitle"].value = "";
        e.target["postMessage"].value = "";
        e.target["image"].value = "";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageUpload = (e) => {
    //Get selected file
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageString = e.target.result;
        setImage(imageString);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h2>Create your post!</h2>

      <form onSubmit={submitHandler}>
        <input type="text" name="postTitle" placeholder="Post Title" required />
        <div className="form-outline">
          <textarea
            className="form-control"
            name="postMessage"
            rows="4"
            placeholder="Enter your Post text"
          ></textarea>
          <input type="file" name="image" onChange={handleImageUpload} />
          {/* <FileBase64
            multiple={false}
            onDone={({ base64 }) => {
              setImage(base64);
            }}
          /> */}
        </div>

        <input type="submit" value="Submit" />
        <p style={{ color: "green" }}>{done}</p>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default CreatePost;

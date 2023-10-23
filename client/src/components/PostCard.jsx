import React from "react";
import axios from "axios";
import { faCoffee ,faStar} from '@fortawesome/free-solid-svg-icons'

import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useNavigate } from "react-router-dom";
function PostCard({ post, currentUserId, setUpdatePosts, favorites }) {
  const navigate = useNavigate();

  const deleteHandler = async (postId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BE_URL}/api/posts/delete/${postId}`,
      );
      setUpdatePosts((oldState) => !oldState);
    } catch (err) {
      console.log(err);
    }
  };

  const favoriteHandler = async (postId) =>{

    try{
      const body = {
        postId, 
        userId: currentUserId
      }
      const response = await axios.put(`${import.meta.env.VITE_BE_URL}/api/user/favorite`, body)
    }
    catch(err){

    }
   }

  const editHandler = async (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div className="card text-center">
      {
        post.owner !== currentUserId &&
        <FontAwesomeIcon icon={favorites? favorites.includes(post._id) ? faStar: faEmptyStar:faEmptyStar} onClick={()=>favoriteHandler(post._id)}/>


      }
        {/* <FontAwesomeIcon icon={faStar}/> */}

      <div className="card-header">{post.postTitle}</div>
      <img src={post.image} width="200px" />
      <div className="card-body">
        <p className="card-text">{post.postMessage}</p>

        {currentUserId === post.owner ? (
          <>
            <button
              className="btn btn-danger m-3"
              onClick={() => deleteHandler(post._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-warning m-3"
              onClick={() => editHandler(post._id)}
            >
              Edit
            </button>
          </>
        ) : (
          <button className="btn btn-primary">Reply</button>
        )}
      </div>
    </div>
  );
}

export default PostCard;

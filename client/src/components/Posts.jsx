import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

function Posts({currentUserId, favorites}) {
    console.log('user id in posts component', currentUserId);
  const [posts, setPosts] = useState([]);
  const [updatePosts, setUpdatePosts] = useState(false)

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BE_URL}/api/posts/get-posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [updatePosts]);

  return (
    <>
    {console.log(currentUserId)}
      <h2>All Posts</h2>
      {posts.map((singlePost) => <PostCard key={singlePost._id} post={singlePost} currentUserId={currentUserId} setUpdatePosts={setUpdatePosts} favorites={favorites}/>)}
    </>
  );
}

export default Posts;

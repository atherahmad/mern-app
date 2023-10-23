import React, {useEffect, useState} from 'react'
import axios from'axios'
import PostCard from './PostCard'

function MyFavorite({userId, favorites}) {

    console.log(userId);
    const [favoritePosts,setFavoritePosts] = useState([])
    const[updatePost, setUpdatePost] = useState(false)

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BE_URL}/api/user/favorite/${userId}`,{ withCredentials: true })
        .then(res=>setFavoritePosts(res.data))
        .catch(err=>console.log(err))
    }, [updatePost])
    return (
        <>
        <h2>
            My Favorite Component
        </h2>

            {
                favoritePosts.map(post => <PostCard post= {post} currentUserId={userId} setUpdatePosts = {setUpdatePost} favorites={favorites}/>)
            }
            
        </>
    )
}

export default MyFavorite

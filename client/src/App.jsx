import './App.css'
import Register from './components/Register'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login'
import Posts from './components/Posts'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import { useState } from 'react'
import EditPost from './components/EditPost'
import MyFavorite from './components/MyFavorite'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})

  useEffect(()=>{
    if(localStorage.getItem('mern-token')){
      console.log(localStorage.getItem('mern-token'))
      axios.get(`${import.meta.env.VITE_BE_URL}/api/auth/verify-token`, {
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('mern-token')}`
        }
      })
      .then(res=>{
        setAuthenticated(true)
        setUser(res.data)
      })
      .catch(err=>localStorage.removeItem('mern-token'))
      /* Then do this thing */
      // I will send that token to the backend
      // Because only backend can verify the token in my application
      // Backend will check the token and the result could be that token is valid or invalid
      // Incase the token is invalid we must respond to the client with failure and the client application must destroy that token
      // Incase the token was valid we can send some information about that user to the client and client will update the state of application 
      // with that information

    }

  },[])

  return (
    <>

      <Router>
        <NavBar authenticated={authenticated} user={user} setUser={setUser} setAuthenticated = {setAuthenticated}/>
        <Routes>
          <Route path='/login' element={<Login setAuthenticated={setAuthenticated} setUser={setUser}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/posts' element={<Posts currentUserId={user._id} favorites={user.favorites}/>}/>
          <Route path='/create-post' element={<CreatePost user={user}/>}/>
          <Route path='/my-favorite' element={<MyFavorite userId={user._id} favorites={user.favorites}/>}/>
          <Route path='/edit-post/:postId' element={<EditPost userId={user._id}/>}/>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

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

function App() {

  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
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

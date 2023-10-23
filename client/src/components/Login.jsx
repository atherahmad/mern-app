import React from 'react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login(props) {

    const {setAuthenticated, setUser} = props
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const submitHandler = async (e) =>{
        e.preventDefault()
        try{
          const userCredentials = {
            email: e.target['email'].value,
            password: e.target['password'].value
          }

          const response  = await axios.post(`${import.meta.env.VITE_BE_URL}/api/user/login`, userCredentials,
          { withCredentials: true }) 
          setAuthenticated(true)
          setUser(response.data)
          localStorage.setItem('mern-token', response.data.token)
          navigate('/')

        }
        catch(err){
          console.log(err);
        }
    }

    return (
        <>
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            
            />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            />
  
          <input type="submit" value="Submit" />
        </form>
  
        {
          error 
            && <p style={{color:'red'}}>{error}</p>          
        }
        <p className="mb-3 text-sm">
          Have not an account? <br />
  
          <NavLink to="/register" className="link" > Register</NavLink>
  
        </p>
      </>
    )
}

export default Login

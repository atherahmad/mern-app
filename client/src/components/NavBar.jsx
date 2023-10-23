
import { NavLink } from 'react-router-dom';

function NavBar({authenticated, user, setUser, setAuthenticated}) {


  const logoutHandler = ()=> {
    setAuthenticated(false)
    setUser({})
    
  }
  return (
    <>
<nav className="nav" style={{display:"flex", justifyContent:"space-between"}}>
            <div>
                <h2 className='text-secondary'>MERN STACK</h2>
            </div>
            <div>
                <NavLink to="/" className="link" >Home</NavLink>

                {authenticated && <NavLink to="/create-post" className="link" >Create Post</NavLink>}
                {authenticated && <NavLink to="/my-favorite" className="link" >My Favorites</NavLink>}

                <NavLink to="/posts" className="link" >Posts</NavLink>

                {!authenticated && <NavLink to="/register" className="link" >Register</NavLink>}

                {authenticated? 
                  <NavLink  className="link" to={'/login'} onClick={logoutHandler} >Logout</NavLink>  
                  :<NavLink to="/login" className="link" >Login</NavLink> 
                }

            </div>
                
        </nav>
      <h2 style={{color: "gold", position:'absolute', top:120, left:10}}>Welcome {user.firstName}! </h2>
    </>
  );
}

export default NavBar;
import React from 'react'
import "./Header.css";
import logo from "../../Assets/logo.png"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    
    <div className='Header'>
      <div className='inner-header'>
      <div className='logoDiv'>
      <img src={logo}/>

      </div>

      <div className='buttons'>
    
      <Link to='/userlogin' > <button className='loginbtn'>Login</button></Link>
   
      <Link to='/userSignup' >  <button className='registerbtn'>Register</button>
</Link>

   
      </div>
      </div>

  

       
      
    </div>
  )
}

export default Header

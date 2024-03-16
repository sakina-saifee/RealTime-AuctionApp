
import React, { useState } from 'react';

import "./login-signup.css";
import { Link, useNavigate } from "react-router-dom";
import loginPicture from "./../../Assets/loginPicture.png"
import {auth, db} from './../../firebaseConfig/firebase';
import { getDatabase, ref, set } from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify';

const Login = () => {

    const [userdata, setuserdata]=useState({
        email:"",
        password:"",
      });
      const navigate=useNavigate();
      
      const handlechange=(e)=>{
      const {name, value}= e.target;
      setuserdata((prevdata)=>({...prevdata,[name]:value}));
      }
      const handleLogin=(e)=>{
      e.preventDefault();
      
      signInWithEmailAndPassword(auth, userdata.email, userdata.password).then((userCredentials)=>{
      
         toast.success("User Logged in Successfully!");
      navigate('/userhome')
      setuserdata({
          email:"",
        password:"",
       })
        setTimeout(()=>{
       navigate('/userhome')
        },4000)
      }).catch((error)=>{
      
      if(userdata.email==="" || userdata.password===""){
         toast.error("Please Fill The Required Fields!");   
      }
      })
      
      }

      
  return (

    <div className='LoginFormOuter'>



<div className='login-form'>
     
<div className='LoginPicture'>
    <img src={loginPicture}/>
</div>

<div className='formControl'>
<p className='header'>Log In</p>

<div className='email'>
  <label>Email</label>
      <input type="text" placeholder='Email here..'  name="email" value={userdata.email} onChange={handlechange}/>
  </div>
    
    
<div className='password'>
<label>Password</label>
      <input type="password" placeholder='Password here..'  name="password" value={userdata.password} onChange={handlechange}/>
</div>
    
<button className='loginBtnForm' onClick={handleLogin}>Log In</button>

<div className='createNewaccdiv'>
  
      <Link to='/userSignup' className='createNewAcc'>  <p>Create New Account</p></Link>
</div>


</div>
  


    
    </div>
   
  
    
    </div>





  )
}

export default Login







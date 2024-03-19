
import React, { useEffect, useState } from 'react';

import "./login-signup.css";
import { Link, useNavigate } from "react-router-dom";
import loginPicture from "./../../Assets/loginPicture.png"
import {auth, db} from './../../firebaseConfig/firebase';
import { getDatabase, ref, set,  onValue} from "firebase/database";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';
import  Header  from "../../components/Header/Header";

const Login = () => {
  const userLoggedUid=auth.currentUser?.uid;
  console.log("user logged", userLoggedUid);
  const dispatch=useDispatch();

    const [userdata, setuserdata]=useState({
        email:"",
        password:"",
        name:""
      });

      const [userGetdata, setuserGetdata]=useState([]);
      const [userLoggedIndata, setuserLoggedIndata]=useState({});
  
      const navigate=useNavigate();
      


      const dbRef = ref(db, '/UserRegister/');

useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const newData = Object.values(snapshot?.val());
      setuserGetdata(newData);
      console.log("snapshot", snapshot.val());
      
    });
  }, []);

  useEffect(() => {
    if (userGetdata.length > 0) {
      console.log("userGetdata n", userGetdata);
    }
  }, [userGetdata]);


  useEffect(()=>{

    userGetdata.map((user, index)=>{
      if(user?.uid==userLoggedUid){
      console.log("user map", user)

        setuserLoggedIndata(user);
      }
    })
  },[userGetdata])


      const handlechange=(e)=>{
      const {name, value}= e.target;
      setuserdata((prevdata)=>({...prevdata,[name]:value}));
      }
      const handleLogin=(e)=>{
      // e.preventDefault();
      console.log("hello");
      
      signInWithEmailAndPassword(auth, userdata?.email, userdata?.password).then((userCredentials)=>{
      
         toast.success("User Logged in Successfully!");
         dispatch(login(userLoggedIndata))
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

    <>
        <Header/>

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
    </>







  )
}

export default Login







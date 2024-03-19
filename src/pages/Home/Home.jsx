import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../store/slices/userSlice'
import "./Home.css";

const Home = () => {


  const userLoggedIn=useSelector((state)=>state.users);
  console.log("user fetch home", userLoggedIn.Name);
const dispatch=useDispatch();
const navigate=useNavigate();

  function LogoutUser(){
    dispatch(logout())
    console.log("working home ")
    navigate("/userlogin")
  }
  return (
   <>

   <div className='LoggedinDetials'>
    <div>
    <button onClick={LogoutUser} className='logoutbtn'>Logout</button>
   <button  className='browseAuctionsbtn'>Browse Auctions</button>
   
   <Link to="/sellitem">   <button className='sellItembtn'>Sell An Item</button> </Link>
   <button className='sellItembtn'>View My Listings</button>
    </div>

      <h1>Welcome, {userLoggedIn.user?.Name} </h1>
    </div>
  
  
   </>
      
   

  )
}

export default Home

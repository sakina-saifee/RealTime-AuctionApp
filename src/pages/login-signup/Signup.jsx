import React, { useState } from "react";
import "./login-signup.css";
import loginPicture from "./../../Assets/loginPicture.png";
import { auth, db } from "./../../firebaseConfig/firebase";
import { getDatabase, ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import  Header  from "../../components/Header/Header";

const Signup = () => {
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));

    console.log(userdata);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      userdata.email,
      userdata.password
    ).then((userCredentials) => {
      const user = userCredentials.user;

      set(ref(db, "UserRegister/" + user.uid), {
        Name: userdata?.name,
        Email: userdata?.email,
        Password: userdata?.password,
        uid: user?.uid,
      })
        .then(() => {
          toast.success("New User Added Successfully!");
          setuserdata({
            email: "",
            password: "",
            name: "",
          });

          setTimeout(() => {
            navigate("/userlogin");
          }, 1000);
        })
        .catch((error) => {
          toast.error("Error");
        });
    });
  };

  return (
    <>
      <Header />

      <div className="LoginFormOuter">
        <div className="login-form">
          <div className="LoginPicture">
            <img src={loginPicture} />
          </div>

          <div className="formControl">
            <p className="header">Sign Up</p>

            <div className="name">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name here.."
                name="name"
                value={userdata.name}
                onChange={handleChange}
              />
            </div>

            <div className="email">
              <label>Email</label>
              <input
                type="text"
                placeholder="Email here.."
                name="email"
                value={userdata.email}
                onChange={handleChange}
              />
            </div>

            <div className="password">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password here.."
                name="password"
                value={userdata.password}
                onChange={handleChange}
              />
            </div>

            <button className="loginBtnForm" onClick={handleSubmit}>
              Sign up
            </button>

            <div className="createNewaccdiv">
              <Link to="/userlogin" className="alreadyhaveAcc">
                <p>Already Have an account? Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

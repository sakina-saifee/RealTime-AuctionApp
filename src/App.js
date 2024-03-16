// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login-signup/Login';
import Home from './pages/Home/Home';
import Signup from './pages/login-signup/Signup';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path="/userlogin" element={<Login />} />
        <Route exact path="/userhome" element={<Home />} />
        <Route exact path="/userSignup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

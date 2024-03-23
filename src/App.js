// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login-signup/Login';
import Home from './pages/Home/Home';
import Signup from './pages/login-signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import SellItem from './pages/SellItem/SellItem';
import BrowseAuction from './pages/BrowseAuction/BrowseAuction';


function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route exact path="/userlogin" element={<Login />} />
        <Route exact path="/userhome" element={<Home />} />
        <Route exact path="/userSignup" element={<Signup />} />
        <Route exact path="/sellitem" element={<SellItem />} />
        <Route exact path="/browseAuction" element={<BrowseAuction />} />
      </Routes>
    </>
  );
}

export default App;

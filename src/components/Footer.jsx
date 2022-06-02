import React, { useState, useEffect, useContext } from 'react';
import { authContext } from '../providers/AuthProvider';
import { displayNavContext } from '../providers/DisplayNavProvider';
import { useNavigate, Link } from 'react-router-dom';


const Footer = (props) => {
  const { user, resetUserInfo, firebaseSignOut } = useContext(authContext);
  const { setShowing, closeNavBar } = useContext(displayNavContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');

  const date = new Date();
  const year = date.getFullYear(date);


  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("date");
    firebaseSignOut();
    resetUserInfo();
    setFirstName(null);
    setShowing(false);
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
    } else {
      setFirstName(null);
    }
  }, [user])


  return (
    <footer class="footer-distributed">

      <div class="footer-left">
        {/* <img src="/logo.png"></img> */}
        <h3>Little<span>Libraries</span></h3>

        {/* <p class="footer-links">
            <a href="#">Home</a>
            |
            <a href="#">About Us</a>
            |
            <a href="#">My Page</a>
            |
            <a href="#">Login</a>
            |
            <a href="#">Sign up</a>
          </p> */}

        <p class="footer-company-name">© {year} Little libraries by J&K</p>
      </div>

      <div class="footer-center">
        <div>
          <Link className="footer-links" to="/" onClick={closeNavBar}><p>Home</p></Link>
        </div>
        <div>
          {firstName && <Link to="/userpage" onClick={closeNavBar}><p>{firstName}'s Page</p></Link>}
        </div>
        <div>
          {!firstName && <Link to="/login" onClick={closeNavBar}><p>Login</p></Link>}
        </div>
        <div>
          {firstName && <Link to="/" onClick={logoutHandler} ><p>Logout</p></Link>}
        </div>
        <div>
          {!firstName && <Link to="/signup" onClick={closeNavBar}><p>Sign Up</p></Link>}
        </div>
      </div>
      <div class="footer-right">
        <p class="footer-company-about">
          <span><Link to="/aboutus" onClick={closeNavBar}>About us</Link></span>
          We offer training and skill building courses across Technology, Design, Management, Science and Humanities.</p>
        <div class="footer-icons">
          <a href="https://www.twitter.com">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.twitter.com">
              <i class="fab fa-behance"></i>
            </a>
            <a href="https://www.twitter.com">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.twitter.com">
              <i class="fab fa-sketch"></i>
            </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

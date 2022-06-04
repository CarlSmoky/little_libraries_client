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
        <h3>Little<span>Libraries</span></h3>

        <p class="footer-company-name">© {year} Little Libraries by K & J</p>
      </div>

      <div class="footer-center footer-links">
        <div>
          <Link to="/" onClick={closeNavBar}>Home</Link>
        </div>
        <div>
          <Link to="/" onClick={closeNavBar}>Search</Link>
        </div>
        <div>
          {firstName && <Link to="/userpage" onClick={closeNavBar}>{firstName}'s Page</Link>}
        </div>
        <div>
          {!firstName && <Link to="/login" onClick={closeNavBar}>Login</Link>}
        </div>
        <div>
          {firstName && <Link to="/" onClick={logoutHandler} >Logout</Link>}
        </div>
        <div>
          {!firstName && <Link to="/signup" onClick={closeNavBar}>Sign Up</Link>}
        </div>
      </div>
      <div class="footer-right">
        <div class="footer-company-about">
          <span><Link to="/aboutus" onClick={closeNavBar}>About us</Link></span>
          <p>Collecting little libraries since some time in April 2022!
          </p>
          </div>
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

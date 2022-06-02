import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider';
import { displayNavContext } from '../providers/DisplayNavProvider';
import { getAuth, signOut } from "firebase/auth";
import { timestampIsFresh } from '../helpers/dateHelpers';

export default function TopNav() {
  const navigate = useNavigate();
  const { user, resetUserInfo } = useContext(authContext);
  const { showing, setShowing, closeNavBar } = useContext(displayNavContext);
  // const [showing, setShowing] = useState(false);

  const firebaseSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("firebase logged out");
    }).catch((error) => {
      console.log("firebase failed to log out");
    });
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("date");
    firebaseSignOut();
    resetUserInfo();
    setShowing(false);
    navigate("/");
  };

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const date = localStorage.getItem("date");

  useEffect(() => {
    if (!date) {
      alert("FYI, you are not logged in")
    } else if (!timestampIsFresh(date)) {
      console.log("DATE", date);
      alert("Time expired, please log in again");
      logoutHandler()
    }
  }, []);

  // const closeNavBar = () => {
  //   setShowing(false);
  // }

  return (
    <div>
      <nav>
        <div className="nav-header">
        <Link to="/" onClick={closeNavBar}><img src="/logo.png" className="logo" alt="logo" /></Link>
          <button className={`nav-toggle 
          ${showing ? "nav-toggle-vertical" : "nav-toggle-horizontal"}`
        } onClick={() => setShowing(!showing)}>
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <ul className={`links 
          ${showing ? "show-links" : ""}
        `}>
          <li>
            <Link to="/" onClick={closeNavBar}>Home</Link>
          </li>
          <li>
            <Link to="/aboutus" onClick={closeNavBar}>About Us</Link>
          </li>
          {!token &&
            <li>
              <Link to="/login" onClick={closeNavBar}>Login</Link>
            </li>
          }
          {!token &&
            <li>
              <Link to="/signup" onClick={closeNavBar}>Sign Up</Link>
            </li>
          }
          {name &&
            <li>
              <Link to="/userpage" onClick={closeNavBar}>{name}</Link>
            </li>
          }
          {token &&
            <li>
              <Link to="/" onClick={logoutHandler}>Logout</Link>
            </li>
          }

        </ul>
      </nav >
    </div >
  );
};

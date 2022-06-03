import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authContext } from '../providers/AuthProvider';
import { Auth, getAuth } from 'firebase/auth';
import { postLoginProcedure } from '../helpers/login-helpers'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(authContext);
  const [errorMessages, setErrorMessages] = useState({});

  const renderErrorMessage = (name) => {
    const msg = errorMessages[name] ? errorMessages[name] : "";
      return <span className="error">{msg}</span>
  };

    const authInput = {
      email,
      password
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      authenticate(authInput);
    }

    const authenticate = (authInput) => {
      const endpoints = {
        "LOGIN": "api/login"
      }

      axios.post(endpoints.LOGIN, authInput)
        .then(response => {
          const { id, firstName, lastName, email, auth, firebaseToken, token } = response.data;
          postLoginProcedure(token, firstName, firebaseToken);
          setUserInfo(id, firstName, lastName, email, auth);
          navigate('/')
        })
        .catch(err => {
          const { emailInvalidMessage, passInvalidMessage } = err.response.data;
          setErrorMessages({ email: emailInvalidMessage, password: passInvalidMessage });
        });
    }

    return (
      <div className="login-form">
        <h2>Login</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-container">
            {/* <label>Email address </label> */}
            <input
              type="email"
              name="email"
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {renderErrorMessage("email")}
          </div>
          <div className="input-container">
            {/* <label>Password </label> */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {renderErrorMessage("password")}
          </div>
          <div className="button-container">
            <button className="button-basic" form="login-form" type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  };

  export default Login;

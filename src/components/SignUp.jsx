import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { authContext } from '../providers/AuthProvider';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap/';
import { postLoginProcedure } from '../helpers/login-helpers';


export default function SignUp() {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(authContext);
  const [errorMessages, setErrorMessages] = useState({});
  // const allowsSignUp = (process.env.REACT_APP_ALLOW_SIGN_UP === 'true');
  const allowsSignUp = true;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const renderErrorMessage = (name) => {
    const msg = errorMessages[name] ? errorMessages[name] : "";
    return <span className="error">{msg}</span>
  };

  const { first_name, last_name, email, password, password_confirmation } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (password === password_confirmation) {
      console.log("handle submit clicked", formData)
      const newUser = { ...formData };
      delete newUser.password_confirmation;
      save(newUser);
    } else {
      console.log('Passwords do not match');
    }
  }


  function save(newUser) {

    const endpoints = {
      "SIGNUP": "http://localhost:3001/api/signup"
    }

    axios.post(endpoints.SIGNUP, newUser)
      .then(response => {
        const { id, firstName, lastName, email, auth, firebaseToken, token } = response.data;
        postLoginProcedure(token, firstName, firebaseToken);
        setUserInfo(id, firstName, lastName, email, auth);
        navigate('/')
      })
      .catch(error => console.log("error msg?", error));
  }


  return (
    <>
      {allowsSignUp ?
        <section className="signUp-form" >
          {/* <div className="mask d-flex align-items-center h-100 gradient-custom-3"> */}
          <h2>Create an account</h2>
          <form onSubmit={handleSubmitClick}>
            <div className="input-container">
              <label className="signUp-form__label">First name</label>
              <input
                type="text"
                // id="1"
                onChange={onChange}
                placeholder='First name'
                name='first_name'
                value={first_name}
                required
              />
            </div>

            <div className="input-container">
            <label className="signUp-form__label">Last name</label>
              <input
                type="text"
                // id="2"
                onChange={onChange}
                placeholder='Last name'
                name='last_name'
                value={last_name}
                required
              />
            </div>
            <div className="input-container">
            <label className="signUp-form__label">Email</label>
              <input
                type="email"
                // id="form3Example3cg"
                onChange={onChange}
                placeholder='Email'
                name='email'
                value={email}
                required
              />
            </div>
            {renderErrorMessage("email")}
            <div className="input-container">
            <label className="signUp-form__label">Password</label>
              <input
                type="password"
                // id="form3Example4cg"
                onChange={onChange}
                placeholder='Password'
                name='password'
                value={password}
                required
              />
            </div>

            <div className="input-container">
            <label className="signUp-form__label">Password Confirmation</label>
              <input
                type="password"
                // id="form3Example4cdg"
                onChange={onChange}
                placeholder='Password Confirmation'
                name='password_confirmation'
                value={password_confirmation}
                required
              />
            </div>
            <div className="button-container">
            <input type="submit" />
            </div>
            <p className="link_to_login">Have already an account? <Link to="/login"> Log In</Link></p>
          </form>
        </section>
        :
        <div>
          <div className="signUp-form" >
            <h2 className="text-uppercase text-center mb-5">Sorry, signup is currently disabled</h2>
          </div>
        </div>
      }
    </>
  )
}

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap/';
import axios from 'axios';
import { authContext } from '../providers/AuthProvider';
import firebaseSignIn from '../FirebaseAuth';
import { Auth, getAuth } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(authContext);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

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
        // console.log("Our Response:", response.data);
        const { id, firstName, lastName, email, auth, firebaseToken } = response.data;
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", firstName);
        }
        setUserInfo(id, firstName, lastName, email, auth);
        firebaseSignIn(firebaseToken);
        navigate('/')
      });
  }

  return (
    <div>
      <div className="card">
        <div className="card-body p-5">
          <div className='form-wrapper'>
          <h2 class="text-uppercase text-center mb-5">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="form-label">Email address</Form.Label>
                <Form.Control
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!validateForm()}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;

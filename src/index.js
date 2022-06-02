import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MarkerProvider from './providers/MarkerProvider'
import AuthProvider from './providers/AuthProvider';
import DisplayNavProvider from './providers/DisplayNavProvider';
import axios from "axios";

// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
axios.defaults.baseURL = "https://little-libraries-jk.herokuapp.com/"

// if (process.env.REACT_APP_API_BASE_URL) {
//   axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
// } else {
// axios.defaults.baseURL = "http://localhost:3001/"
// }

ReactDOM.render(
  <React.StrictMode>
    <DisplayNavProvider>
      <MarkerProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MarkerProvider>
    </DisplayNavProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

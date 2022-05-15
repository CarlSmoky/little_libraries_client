import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { markerContext } from '../providers/MarkerProvider';
import ImageLoadTest from './ImageLoadTest'

const LibraryForm = () => {
  const location = useLocation();
  const { fetchMarkers, typedAddress } = useContext(markerContext);
  const { lat, lng } = location.state;
  const [formData, setFormData] = useState({
    address: "",
    lat: lat,
    lng: lng
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [libraryId, setLibraryId] = useState('');

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    save(formData);
  };

  const save = (formData) => {
    const endpoints = {
      "LIBRARY": "api/libraries"
    }

    axios.post(endpoints.LIBRARY, formData, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then(response => {
        if (!response.data.auth) {
          setErrorMessage(response.data.message);
          console.log(errorMessage);
        } else {
          fetchMarkers();
          setLibraryId(response.data.library.id);
        }
      });
  }
  const token = localStorage.getItem("token");

  return (
    <div className="login-form">
      <h2>Register New Library</h2>
      {token && <form onSubmit={handleSubmit}>
        <div className="input-container">
          {/* <label>Email address </label> */}
          <input
            type="text"
            name="address"
            placeholder='address or name'
            onChange={onChange}
            value={typedAddress || formData.address}
            required
            disabled={libraryId}
          />
        </div>
        <div className="button-container">
          {!libraryId && <input type="submit" />}
        </div>
      </form>}
      <p>{errorMessage}</p>
      {errorMessage && <Link to={"/login"}><button className="button-basic">Login</button></Link>}
      {!token && <Link to={"/login"}><button className="button-basic">Login</button></Link>}
        {libraryId && <ImageLoadTest libraryId={libraryId}/>}
    </div>
  )
}
export default LibraryForm

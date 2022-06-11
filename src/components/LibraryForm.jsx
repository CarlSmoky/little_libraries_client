import React, { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { markerContext } from '../providers/MarkerProvider';
import ImageLoadTest from './ImageLoadTest'

const LibraryForm = () => {
  const location = useLocation();
  const { fetchMarkers, typedAddress, setTypedAddress } = useContext(markerContext);
  const { lat, lng } = location.state;
  const [formData, setFormData] = useState({
    address: "",
    lat: lat,
    lng: lng
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [libraryId, setLibraryId] = useState('');
  const endpoints = {
    "LIBRARY": "api/libraries",
    "RECORD_VISITS": `api/visits`
  }

  useEffect(() => {
    setFormData({ ...formData, address: typedAddress || "" });
  }, []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setTypedAddress("");
    save(formData);
  };

  const save = (formData) => {

    axios.post(endpoints.LIBRARY, formData, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then(response => {
        if (!response.data.auth) {
          setErrorMessage(response.data.message);
        } else {
          fetchMarkers();
          setErrorMessage('');
          setLibraryId(response.data.library.id);
          addVisitCount(response.data.library.id);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const addVisitCount = (libraryId ) => {
    axios.post(endpoints.RECORD_VISITS, { libraryId  }, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then(response => {
        const { time, count, countByUser } = response.data;
        console.log("logged count", response.data );
      })
      .catch(err => {
        const { message } = err.response.data;
        console.log(message);
      })
  }

  const token = localStorage.getItem("token");

  return (
    <div className="login-form">
      <h2>Register New Library</h2>
      {token &&
        <>
        <form id='register-library-form' onSubmit={handleSubmit}>
          <div className="input-container">
            {/* <label>Email address </label> */}
            <input
              type="text"
              name="address"
              placeholder='address or name'
              onChange={onChange}
              value={formData.address}
              required
              disabled={libraryId} />
          </div>
        </form>
        <p>{errorMessage}</p>
          {!libraryId && <div className="button-container">
            <button className="button-basic" form="register-library-form" type="submit">Submit</button>
          </div>}
        </>
      }

      {!token &&
        <>
          <p>To resister a library, you need to log in.</p>
          <Link to={"/login"}><button className="button-basic">Log In</button></Link>
          <Link to={"/signup"}><button className="button-basic">Sign Up</button></Link>
        </>
      }
      {libraryId && <ImageLoadTest libraryId={libraryId} />}
    </div>
  )
}
export default LibraryForm

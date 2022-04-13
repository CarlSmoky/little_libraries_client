import React, { useState, useContext, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap/';
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { markerContext } from '../providers/MarkerProvider';
import ImageLoadTest from './ImageLoadTest'

const LibraryForm = () => {
  const location = useLocation();
  const { lat, lng } = location.state;
  const [formData, setFormData] = useState({
    address: "",
    lat: lat,
    lng: lng
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchMarkers } = useContext(markerContext);
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
        // console.log("I'm the callback from the put call");
        // console.log("Our Response:", response.data);
        if (!response.data.auth) {
          setErrorMessage(response.data.message);
          console.log(errorMessage);
        } else {
          fetchMarkers();
          // navigate(`/upload/${response.data.library.id}`)
          // navigate(`/library/${response.data.library.id}`)
          setLibraryId(response.data.library.id);
        }
      });
  }
  const token = localStorage.getItem("token");

  return (
    <div className="card">
      <div className="card-body p-5">
        {token && <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h2 class="text-uppercase text-center mb-5">Register New Library</h2>
          <Row className="mb-3">
            <Form.Group controlId="validationCustom01">
              <Form.Label>Enter Name or Address of Library</Form.Label>
              <Form.Control
                name="address"
                value={formData.address}
                onChange={onChange}
                required
                type="text"
                placeholder="Name/Address"
              />
              <Form.Control.Feedback>Please select an image of the library</Form.Control.Feedback>
            </Form.Group>
          </Row>
          {!libraryId && <Button type="submit">Submit form</Button>}
        </Form>}
        <p>{errorMessage && errorMessage}</p>
        {errorMessage && <Link to={"/login"}><Button Link>Login</Button></Link>}
        {!token && <Link to={"/login"}><Button Link>Login</Button></Link>}
        {libraryId && <ImageLoadTest libraryId={libraryId}/>}
      </div>
    </div>
  );
}


export default LibraryForm

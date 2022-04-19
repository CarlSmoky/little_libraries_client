import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp
import { Button } from 'react-bootstrap/';
import axios from 'axios';


const LibraryDetail = ({ libraryInfo }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState();
  const storage = getStorage();
  const libraryId = libraryInfo.id;
  const [count, setCount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [countByUser, setCountByUser] = useState("");
  const token = localStorage.getItem("token");

  if (libraryInfo.id) {
    getDownloadURL(ref(storage, `images/${libraryInfo.id}.jpg`))
      .then(url => {
        setSelectedImageUrl(url);
      })
      .catch(err => {
        console.log(err);
      })
  }
  useEffect(() => {
    if (!token) {
      const endpoints = {
        "VISITS": `api/visits/library/${libraryId}`
      }
      axios.get(endpoints.VISITS)
        .then(response => {
          const { count} = response.data;
          setCount(count);
        });
    } else {
      const endpoints = {
        "VISITS": `api/visits/library/`
      }
      axios.post(endpoints.VISITS, { libraryId }, {
        headers: {
          "x-access-token": token,
        }
      })
        .then(response => {
          const { count, countByUser } = response.data;
          console.log(count);
          setCount(count);
          setCountByUser(countByUser);
        });
    }
  }, [libraryId, token])

  const handleClick = () => {
    const endpoints = {
      "RECORD_VISITS": `api/visits/`
    }

    axios.post(endpoints.RECORD_VISITS, { libraryId }, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      }
    })
      .then(response => {
        const { time, count, countByUser } = response.data;
        setCreatedAt(time);
        setCount(count);
        setCountByUser(countByUser);

      });

  }

  return (
    <div className="libraryDetails">
      {selectedImageUrl && <img src={selectedImageUrl} alt="photo of library" />}
      <p>{libraryInfo.address}</p>
      {token && <Button onClick={handleClick}>Record Visit</Button>}
      {token && countByUser && <p>You have visited {countByUser} times</p>}
      {token && createdAt && <p>{createdAt}</p>}
      <p>All users have visited {count} times</p>
      {!token && !selectedImageUrl && <p>No photos!</p>}
      {!token && !selectedImageUrl && <Link to="/login"> Login</Link>}
      {token && !selectedImageUrl && <Link to="/upload" state={{ libraryId }}>Upload image</Link>}
    </div>
  )
}

export default LibraryDetail;

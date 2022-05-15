import React, { useState } from 'react';
import firebaseApp from './../Firebase.js'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { resizeFile, dataURIToBlob } from './../resizeFile.js';
import firebaseSignIn from '../FirebaseAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ImageLoadTest({libraryId}) {
  const navigate = useNavigate();
  console.log("current user?", getAuth().currentUser);
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const [selectedImage, setSelectedImage] = useState(null);

  const addVisitCount = () => {
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
        console.log("logged count");
      });
  }

  const uploadImageToFirebase = () => {
    resizeFile(selectedImage)
      .then(resized => {
        const newFile = dataURIToBlob(resized);
        uploadBytes(storageRef, newFile).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          addVisitCount();
          navigate(`/library/${libraryId}`);
        });
      })
      .catch(err => {
        console.log(err);
      })
  }


  // this creates the firebase ref; use uploadBytes to connect the file to the ref
  const storageRef = ref(storage, `images/${libraryId}.jpg`);
  return (
    <div>
      {selectedImage && (
        <div>
          <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button className="button-basic" onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input className="button-container"
        type="file"
        name="myImage"
        display={selectedImage ? "none" : ""}
        onChange={(event) => {
          console.log(event.target.files[0]);
          const uploadedFile = event.target.files[0];
          setSelectedImage(uploadedFile);
        }}
      />
      <br/>
      {selectedImage && <button className="button-basic" onClick={uploadImageToFirebase}>Submit</button>}
    </div>
  );
}

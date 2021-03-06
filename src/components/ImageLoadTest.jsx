import React, { useState } from 'react';
import firebaseApp from './../Firebase.js'
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { resizeFile, dataURIToBlob } from './../resizeFile.js';
import { useNavigate, useLocation  } from 'react-router-dom';
import { fetchAndStoreImageURL} from '../helpers/image-upload-helpers.js';
import axios from 'axios';

export default function ImageLoadTest({ libraryId }) {

  const navigate = useNavigate();
  const location = useLocation();
  const libId = libraryId ?? location.state.libraryId;
  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);
  const [selectedImage, setSelectedImage] = useState(null);
  const storageRef = ref(storage, `images/${libId}.jpg`);

  console.log("in imageload test", libId);
  const uploadImageToFirebase = () => {
    resizeFile(selectedImage)
      .then(resized => {
        const newFile = dataURIToBlob(resized);
        uploadBytes(storageRef, newFile).then((snapshot) => {
          fetchAndStoreImageURL(libId, () => { navigate(`/library/${libId}`) });
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

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
      <div className="file-input-container">
        <input className="button-container file-input"
          type="file"
          name="myImage"
          display={selectedImage ? "none" : ""}
          onChange={(event) => {
            console.log(event.target.files[0]);
            const uploadedFile = event.target.files[0];
            setSelectedImage(uploadedFile);
          }}
        />
      </div>
      <br/>
        {selectedImage && <button className="button-basic" onClick={uploadImageToFirebase}>Submit</button>}
    </div>
  );
}

import axios from 'axios';
import firebaseApp from './../Firebase.js'; // temp, probably
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // temp

const addImageURL = (id, imageURL, navigationAfter) => {
  const endpoints = {
    "STORE_IMAGE_URL": "api/libraries/imageURL"
  }
  console.log("in addImageURL", imageURL);
  axios.post(endpoints.STORE_IMAGE_URL, {id, imageURL})
    .then(response => {
      navigationAfter();
    })
    .catch(err => {
      const { message } = err.response.data;
      console.log(message);
    });
}

const fetchAndStoreImageURL = (id, navigationAfter) => {
  const storage = getStorage();
  getDownloadURL(ref(storage, `images/${id}.jpg`))
  .then(url => {
    console.log("fetched url", url);
    addImageURL(id, url, navigationAfter);
  }).catch(err => {
    const { message } = err.response.data;
    console.log("fetchAndStoreImageURL error", message);
  })
}

export { fetchAndStoreImageURL }

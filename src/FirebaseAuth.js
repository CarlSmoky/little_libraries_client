import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseSignIn = (firebaseToken) => {
  const auth = getAuth();
  signInWithCustomToken(auth, firebaseToken)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("firebase logged in successfully", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("firebase login failed", errorMessage);
    });
}

export default firebaseSignIn;

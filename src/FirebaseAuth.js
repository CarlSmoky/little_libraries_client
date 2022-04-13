import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseSignIn = (firebaseToken) => {
  const auth = getAuth();
  signInWithCustomToken(auth, firebaseToken)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // console.log("success", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("failed", errorMessage);
    });
}

export default firebaseSignIn;

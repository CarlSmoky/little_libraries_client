import firebaseSignIn from '../FirebaseAuth';

const postLoginProcedure = (token, firstName, firebaseToken) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("token", token);
    localStorage.setItem("name", firstName);
    localStorage.setItem("date", new Date());
  }
  firebaseSignIn(firebaseToken);
}

export {postLoginProcedure}

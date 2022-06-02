import React, { createContext, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";

export const authContext = createContext();

const AuthProvider = props => {
  const [user, setUser] = useState(null);

  const setUserInfo = (id, firstName, lastName, username, email, auth) => {
    const user = {
      id,
      firstName,
      lastName,
      email,
      auth
    };
    setUser(user);
  };

  const resetUserInfo = () => {
    setUser(null);
  }

  const firebaseSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("firebase logged out");
    }).catch((error) => {
      console.log("firebase failed to log out");
    });
  }

  const provideData = { user, setUserInfo, resetUserInfo, firebaseSignOut};

  return (
    <authContext.Provider value={provideData}>
      {props.children}
    </authContext.Provider>
  );

};

export default AuthProvider;
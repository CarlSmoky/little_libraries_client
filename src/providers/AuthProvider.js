const { useState, createContext } = require("react");

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

  const provideData = { user, setUserInfo, resetUserInfo };

  return (
    <authContext.Provider value={provideData}>
      {props.children}
    </authContext.Provider>
  );

};

export default AuthProvider;
import React, { createContext, useState } from 'react';

export const displayNavContext = createContext();

const DisplayNavProvider = props => {
  const [showing, setShowing] = useState(false);

  const closeNavBar = () => {
    setShowing(false);
  }

  const provideData = { showing, setShowing, closeNavBar };

  return (
    <displayNavContext.Provider value={provideData}>
      {props.children}
    </displayNavContext.Provider>
  )
}

export default DisplayNavProvider;
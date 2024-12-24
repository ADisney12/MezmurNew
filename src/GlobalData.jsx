import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create a provider component to wrap around your app
export const GlobalProvider = ({ children }) => {
  const [ GlobalData, setGlobalData] = useState("Friday "); // Global variable

  return (
    <GlobalContext.Provider value={{  GlobalData, setGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};

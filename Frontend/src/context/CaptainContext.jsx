import React, { createContext, useState } from "react";

export const captainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    captain,
    setCaptain,
    isLoading,
    setisLoading,
    error,
    setError,
  };

  return (
    <captainDataContext.Provider value={value}>
      {children}
    </captainDataContext.Provider>
  );
};

export default CaptainContext;

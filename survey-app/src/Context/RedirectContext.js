import React, { createContext, useState } from 'react';

export const RedirectContext = createContext();

export const RedirectProvider = ({ children }) => {
  const [redirectUrl, setRedirectUrl] = useState(null);

  return (
    <RedirectContext.Provider value={{ redirectUrl, setRedirectUrl }}>
      {children}
    </RedirectContext.Provider>
  );
};
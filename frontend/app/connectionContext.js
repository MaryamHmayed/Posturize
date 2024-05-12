import React, { createContext, useContext, useState } from 'react';

const ConnectionContext = createContext({
  isConnected: false,
  setConnectionStatus: () => {}
});

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({ children }) => {

    const [isConnected, setIsConnected] = useState(false);  

  const setConnectionStatus = (status) => setIsConnected(status);

  return (
    <ConnectionContext.Provider value={{ isConnected, setConnectionStatus }}>
      {children}
    </ConnectionContext.Provider>
  );
};
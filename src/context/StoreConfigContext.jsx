import React, { createContext, useContext, useState, useEffect } from "react";
import { subscribeStoreConfig, DEFAULT_STORE_CONFIG } from "../services/storeService";

const StoreConfigContext = createContext(DEFAULT_STORE_CONFIG);

export const StoreConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(DEFAULT_STORE_CONFIG);

  useEffect(() => {
    const unsubscribe = subscribeStoreConfig((newConfig) => {
      setConfig(newConfig);
    });
    return () => unsubscribe();
  }, []);

  return (
    <StoreConfigContext.Provider value={config}>
      {children}
    </StoreConfigContext.Provider>
  );
};

export const useStoreConfig = () => useContext(StoreConfigContext);

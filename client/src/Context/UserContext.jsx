import { createContext, useState, useContext } from "react";

export const UserContext = createContext([]);

export const ContextProvider = ({ children }) => {
  const [archivos, setArchivos] = useState("");
  const [data, setData] = useState({
    timestamp: 0,
    user: 0,
    exists: null,
    kec: 0,
    block_num: 0,
  });

  const [sha, setSha] = useState(null);
  const [transactionHash, setTransactionHash] = useState("");

  return (
    <UserContext.Provider
      value={{
        archivos,
        data,
        sha,
        transactionHash,
        setArchivos,
        setData,
        setSha,
        setTransactionHash,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useContextProvider = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useContextProvider must be used within a ContextProvider");
  }
  return context;
};

import React, { createContext, useState, useEffect , useContext} from "react";

// Create a context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [dataorder, setDataorder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usercount, setUsercount] = useState(0);
  const [pharmaciescount, setPharmaciescount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 




  const login = () => setIsAuthenticated(true); // Example login function
  const logout = () => setIsAuthenticated(false); // Example logout functio


  

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.medstown.com/customer/finalorder"
      );
      const result = await response.json();
      setDataorder(result.reverse());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        dataorder,
        loading,
        refetch: fetchData,
        usercount,
        setUsercount,
        pharmaciescount,
        setPharmaciescount,
        isAuthenticated, login, logout
      }}
    >
      {children}
    </MyContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(MyContext); // Export useAuth here
};
import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [dataorder, setDataorder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.medstown.com/customer/finalorder');
      const result = await response.json();
      setDataorder(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MyContext.Provider value={{ dataorder, loading, refetch: fetchData }}>
      {children}
    </MyContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const GetMeContext = createContext();

export function GetMeProvider({ children }) {
  const storedLogin = localStorage.getItem("isLogin");
  const [me, setMe] = useState();

  const [loading, setLoading] = useState(true);
  useEffect(() => {

    const getMe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/auth/me`);
        console.log("responASDADADASASDse", response);

        if (response.status === 200) { 
          setMe(response.data.user);
          setLoading(false);
          localStorage.setItem("isLogin", "true");

        }

      } catch (error) {
        console.error("Error fetching user data:", error.message);
        localStorage.removeItem("isLogin");
        setLoading(true);
      }
    };
    console.log("storedLogin", storedLogin);

    getMe();


  }, [storedLogin]);
  const value = {
    me,
    setMe,
    loading
  };
  return (
    <GetMeContext.Provider value={value}>{children}</GetMeContext.Provider>
  );
}

export default GetMeContext;

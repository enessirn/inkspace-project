import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const GetMeContext = createContext();

export function GetMeProvider({ children }) {
  const storedLogin = localStorage.getItem("isLogin");
  const [me, setMe] = useState(null);
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_SERVER_API_URL);
    if (storedLogin === "true") {
      const getMe = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/auth/me`);
          if(response.status === 200) {
            setMe(response?.data?.user);
            localStorage.setItem("isLogin", "true");
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("isLogin");
        }
      };

      console.log("storedLogin", storedLogin);
      if (storedLogin === "true") {
        getMe();
      }

    }
  }, [storedLogin]);
  const value = {
    me,
    setMe,
  };
  return (
    <GetMeContext.Provider value={value}>{children}</GetMeContext.Provider>
  );
}

export default GetMeContext;

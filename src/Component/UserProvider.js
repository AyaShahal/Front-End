import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);
 const [organization,setOrganization]=useState([]);
  const context = useContext(UserContext)
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "https://surplus-app-api.onrender.com/api/user/register",
        userData,
        { withCredentials: true }
      );
      console.log(response)
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "https://surplus-app-api.onrender.com/api/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const { ...responseData } = response.data;
  
      if (response.data.user.role === "Business") {
        localStorage.setItem("userResponse", JSON.stringify(responseData));
        setUser(responseData);
      } else if (response.data.user.role === "Organization") {
        localStorage.setItem("organizationResponse", JSON.stringify(responseData));
        setOrganization(responseData);
      }
  
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  

  const logoutUser = () => {
    setUser(null);
  };
  const loginAdmin = async (email, password) => {
    try {
      const response = await axios.post(
        "https://surplus-app-api.onrender.com/api/admin/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const adminResponse = response.data;

     
      localStorage.setItem("adminResponse", JSON.stringify(adminResponse));

      setUser(adminResponse);

      return adminResponse;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <UserContext.Provider
      value={{
        userId: userId,
        user: user,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        loginAdmin: loginAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

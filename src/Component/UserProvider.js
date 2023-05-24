import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/register",
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
        "http://localhost:7000/api/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const userIdValue = response.data.user.id;

      // Save the user ID in local storage
      localStorage.setItem("userId", userIdValue);

      console.log("Response:", response.data);
      console.log("User ID:", userIdValue);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        userId: userId,
        user: user,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

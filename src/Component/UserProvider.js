import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState(null);
  const context = useContext(UserContext)
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

    const userResponse = response.data;

    // Save the response data in local storage
    localStorage.setItem("userResponse", JSON.stringify(userResponse));

    setUser(userResponse);

    return userResponse;
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
        "http://localhost:7000/api/admin/login",
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

import React, {  useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../UserProvider";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import "./Signin.css";

function Signin() {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useContext(UserContext);
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await loginUser(email, password);
      console.log("Response:", response);
      if (response) {
        const { role } = response.user;
  
        // Check the role of the user
        if (role === 'Business') {
          const token = response.user.token;
          Cookies.set("jwt", token);
          const cookieValue = Cookies.get("jwt");
          console.log("Cookie value:", cookieValue);
          Navigate("/userProfile"); 
        } else {
          const token = response.user.token;
          Cookies.set("auth", token);
          Navigate("/Food"); 
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        console.log("Login error:", errorMessage);
        setError(errorMessage);
      } else {
        console.log("An error occurred during login:", error.message);
        setError("An error occurred during login");
      }
    }
  
    setLoading(false);
  };
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


 

  return (
    <div className="signup">
      <div className="section1">
        <h1>Login </h1>
        <p>
          Join the movement to fight food waste and hunger. Login now and make a
          difference.
        </p>
      </div>
      <div className="section3">
        <form className="register-inputs" onSubmit={handleLogin}>
          <div className="login-section">
          {error && <div className="error-message">{error} !</div>}
            <div className="input-group">
           
              <input
                className="input"
                type="email"
                name="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
             
            </div>

            <div className="input-group">
            {errors.password && <p className="error">{errors.password}</p>}
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <FontAwesomeIcon
                icon={faEye}
                className="showing-password"
                onClick={handleTogglePassword}
              />
             
            </div>
            {/* <div className="forgot-password">
              <NavLink to="/">Forgot password?</NavLink>
            </div> */}
            <div className="register-buttons">
          <button type="submit" disabled={loading}> {loading ? "Logging ..." : "Login"}</button>
         
        </div>
          </div>
         
        </form>

       
      </div>
    </div>
  );
}

export default Signin;

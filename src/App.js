import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Header from "./Component/Header/header";
import Footer from "./Component/Footer/footer";
import Home from "./Pages/Home/Home";
import About from "./Pages/About /About";
import Food from "./Pages/Food/Food";
import NotFound from "./Pages/404 /404";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Contact from "./Pages/ContactUs/Contact";
import Profile from "./Pages/User-Profile/User-Profile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Admin from "./Component/Admin/Admin";
import Users from "./Component/Users/User";
import Product from "./Component/Product/Product";
import Category from "./Component/Category/Category";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="Food" element={<Food />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Contact Us" element={<Contact />} />
          <Route path="userProfile" element={<Profile />} />
          <Route path="/404/*" element={<NotFound />} />
          <Route path="Profile" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />}>
            <Route path="/Dashboard/Product" element={<Product />} />
            <Route path="/Dashboard/Categories" element={<Category />} />
            <Route path="/Dashboard/User" element={<Users />} />
            <Route path="/Dashboard/Admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

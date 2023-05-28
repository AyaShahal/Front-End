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
import Sidebar from "./Component/Sidebar/Sidebar";
import {PrivateRoutes ,AdminRoutes} from "./utils/PrivateRoute";
import Adminlogin from "./Pages/Admin-login/admin-login";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Dashboard/*" element={<DashboardLayout />} />
          <Route path="/*" element={<DefaultLayout />} />
          <Route path="/404/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
function DefaultLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Food" element={<Food />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AdminLogin" element={<Adminlogin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Contact Us" element={<Contact />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/UserProfile" element={<Profile />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

function DashboardLayout() {
  return (

    <div className="layout">
      <Sidebar />
      <div className="content">
        <Routes>
        <Route element={< AdminRoutes/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Categories" element={<Category />} />
          <Route path="/User" element={<Users />} />
          <Route path="/Admin" element={<Admin />} />
          </Route>
        </Routes>
      </div>
    </div>
 
  );
}

export default App;

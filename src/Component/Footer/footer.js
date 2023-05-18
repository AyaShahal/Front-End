import "./footer.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from '../Savior-removebg-preview.png'
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
function Footer() {
  return (
    <footer>
      <div className="parent_container">


        <div className="footer-container">
          <img
             src={logo}
            alt="logo"
         height="150px"  width="150px"/>


        </div>
        <div className="footer-section">
        <div className="footer-container1">
          <h3>PRODUCTS</h3>
          <NavLink to="/Food " className="links">Surplus Food Posting </NavLink>
          <NavLink to="/Food" className="links"> Food Search  </NavLink>
          <NavLink to="/Food"  className="links">Analytics </NavLink>
        </div>
        <div className="footer-container1   boxReverse">
          <h3>COMPANY</h3>
          <NavLink to="/About" className="links">About Us</NavLink>
          <NavLink to="/Event" className="links">Our mission</NavLink>
          <NavLink to="/Contact" className="links">Our Value</NavLink>
        </div>
        <div className="footer-container1   _location__box">
        <h3>Food Waste Reduction Platform</h3>
      <p>Contact Information:</p>
      <p>Email: <a href="mailto:shop@gmail.com"> info@foodwastereduction.com</a></p>
      <p>
      Phone: <a href="tel:456-789"> (961) 456-789</a></p>
        </div>
        </div>
      </div>
      <div className="line">
      <hr/>
      </div>

      <div className="social">
            <p>&copy; 2023 Food Waste Reduction Platform. All rights reserved.</p>

          <div className="social-icons-container">
            <p> Follow Us :</p>
            <a href="https://www.facebook.com/">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://www.instagram.com/">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://twitter.com/">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://whatsapp.com/">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
          </div>
          </div>

    </footer>
  );
}

export default Footer;
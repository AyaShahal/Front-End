import React ,{useState} from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import "./contact.css";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapMarkerAlt,
  faEnvelope,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

function ContactUs() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  
    axios
      .post("https://surplus-app-api.onrender.com/api/Contact", formData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          FirstName: "",
          LastName: "",
          phone: "",
          email: "",
          message: "",
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Message sent successfully!',
        });
        
        // Reset the form fields
        event.target.reset();
      })
      .catch((error) => {
        console.error(error);
  
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to send message.',
        });
      });
  };
  

  return (
    <div className="contactForm">
      <div className="section1">
        <h2>Contact Us </h2>
        <p>
          Feel Free to contact us any time. We will get back to you as soon as
          we can!.
        </p>

        <div className="personal">
          <div className="contact-us__details">
            <div className="contact-us__detail">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="contact-us__icon"
              />
              <span className="contact-us__detail-text">
                123 Main Street, Anytown USA
              </span>
            </div>
            <div className="contact-us__detail">
              <FontAwesomeIcon icon={faEnvelope} className="contact-us__icon" />
              <a
                href="mailto:contact@example.com"
                className="contact-us__detail-text"
              >
                info@SurplusSavior.com
              </a>
            </div>
            <div className="contact-us__detail">
              <FontAwesomeIcon icon={faPhoneAlt} className="contact-us__icon" />
              <a href="tel:+1234567890" className="contact-us__detail-text">
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>

        <div className="social1">
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
      </div>

      <div className="section2">
        <form className="register-inputs" id="form1"
            onSubmit={handleSubmit}  >
          <div className="input-section"></div>
          <div className="input-section">
            <div className="input-group">
              <input
                className="input"
                type="text"
                name="FirstName"
                required={true}
                onChange={handleInputChange}
              />
              <label htmlFor="username" className="input-label">
                First Name
              </label>
            </div>
            <div className="input-group">
              <input
                className="input"
                type="text"
                name="LastName"
                required={true}
                onChange={handleInputChange}
              />
              <label htmlFor="username" className="input-label">
                Last Name
              </label>
            </div>
          </div>
          <div className="input-section">
            <div className="input-group">
              <input className="input" type="tel" name="phone" required    onChange={handleInputChange}/>
              <label htmlFor="phone" className="input-label">
                Phone
              </label>
            </div>
            <div className="input-group">
              <input
                className="input"
                type="email"
                name="email"
                required={true}
                onChange={handleInputChange}
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
            </div>
          </div>
          <div className="input-section">
          <div className="input-message">
            <textarea
              className="form-control form-group"
              placeholder="Message"
              name="message"
              onChange={handleInputChange}
            ></textarea>
          </div>
          </div>
          <div className="register-buttons">
            <button type="submit" >Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ContactUs;

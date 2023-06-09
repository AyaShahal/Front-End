import React from "react";
import './join-us.css';
import { Link } from "react-router-dom";
function Join() {
  return (
    <div className="join">
      <h1>Join Us</h1>
      <span>Join For Better Future</span>
      <p>
        We invite you to join us on this journey towards a more sustainable and
        equitable world. Together, we can create lasting change, one surplus
        meal at a time. Whether you are a business with surplus food or a
        charitable organization committed to alleviating hunger, our platform
        provides the tools and resources to make a meaningful impact
      </p>
      <Link to="/signup">
  <button className="btn-primary">Join Now</button>
</Link>
    </div>
  );
}

export default Join;

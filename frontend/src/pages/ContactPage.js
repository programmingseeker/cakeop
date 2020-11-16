import React, { useState } from "react";
function ContactForm() {
  const [focus, setFocus] = useState(null);
  const [loading, setloading] = useState(false);

  return (
    <div className="container-contact">
      <span className="bg-circle"></span>
      <div className="form-contact">
        <div className="contact-info">
          <h3 className="title-contact">Let's get in touch</h3>
          <p className="text-contact">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
            dolorum adipisci recusandae praesentium dicta!
          </p>
          <div className="info">
            <div className="information">
              <i
                className="fas fa-map-marked-alt mr-2"
                style={{ "font-size": "28px", color: "#00bcd4" }}
              ></i>
              <p> Bangalore India 560079</p>
            </div>
            <div className="information">
              <i
                className="fas fa-envelope mr-2"
                style={{ "font-size": "28px", color: "#00bcd4" }}
              ></i>
              <p>programmingseeker@gmail.com</p>
            </div>
            <div className="information">
              <i
                className="fas fa-phone-alt mr-2"
                style={{ "font-size": "28px", color: "#00bcd4" }}
              ></i>
              <p>+91 123-456-7890</p>
            </div>
          </div>

          <div className="social-media">
            <p>Connect with us :</p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <span className="circle one"></span>
          <span className="circle two"></span>

          <form className="form-contact-text" autocomplete="off">
            <h3 className="title-contact">Contact Developers</h3>
            <div className={`input-container ${focus ? "focus" : null}`}>
              <input
                onFocus={() => {
                  setFocus("focus");
                }}
                onBlur={() => {
                  setFocus(null);
                }}
                type="text-contact"
                name="name"
                className="input"
              />
              <label for="">Username</label>
              <span>Username</span>
            </div>
            <div className={`input-container ${focus ? "focus" : null}`}>
              <input
                onFocus={() => {
                  setFocus("focus");
                }}
                onBlur={() => {
                  setFocus(null);
                }}
                type="email"
                name="email"
                className="input"
              />
              <label for="">Email</label>
              <span>Email</span>
            </div>
            <div className={`input-container ${focus ? "focus" : null}`}>
              <input
                onFocus={() => {
                  setFocus("focus");
                }}
                onBlur={() => {
                  setFocus(null);
                }}
                type="numeric"
                name="phone"
                className="input"
              />
              <label for="">Phone</label>
              <span>Phone</span>
            </div>
            <div
              className={`input-container textareaout ${
                focus ? "focus" : null
              }`}
            >
              <textarea
                name="message"
                className="input textarea"
                onFocus={() => {
                  setFocus("focus");
                }}
                onBlur={() => {
                  setFocus(null);
                }}
              ></textarea>
              <label for="">Message</label>
              <span>Message</span>
            </div>
            <input type="submit" value="Send" className="sumbit-contact-btn" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;

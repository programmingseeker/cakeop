import React, { useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
function ContactForm() {
  const [focus, setFocus] = useState(null);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState(null);
  const [message, setmessage] = useState("");
  const [alert, setalert] = useState(false);
  const sendMailHandler = async (e) => {
    e.preventDefault();
    const mailInput = {
      username,
      email,
      phone,
      message,
    };
    setFocus(true);
    await axios.post("/api/upload/contactus", mailInput);
    setFocus(false);

    setalert(true);
    setusername("");
    setemail("");
    setphone("");
    setmessage("");
    setTimeout(() => {
      setalert(false);
    }, 4000);
  };
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
                style={{ fontSize: "28px", color: "#00bcd4" }}
              ></i>
              <p> Bangalore India 560079</p>
            </div>
            <div className="information">
              <i
                className="fas fa-envelope mr-2"
                style={{ fontSize: "28px", color: "#00bcd4" }}
              ></i>
              <p>programmingseeker@gmail.com</p>
            </div>
            <div className="information">
              <i
                className="fas fa-phone-alt mr-2"
                style={{ fontSize: "28px", color: "#00bcd4" }}
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
            {alert ? <Alert variant="success">Sent successfully</Alert> : ""}
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
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <label>Username</label>
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
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <label>Email</label>
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
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
              <label>Phone</label>
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
                value={message}
                onFocus={() => {
                  setFocus("focus");
                }}
                onBlur={() => {
                  setFocus(null);
                }}
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
              ></textarea>
              <label>Message</label>
              <span>Message</span>
            </div>
            <button
              type="submit"
              className="sumbit-contact-btn"
              onClick={sendMailHandler}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;

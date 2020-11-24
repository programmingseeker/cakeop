import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "./../actions/userActions";
import FormContent from "./FormContent";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const [showModal, setshowModal] = useState(false);
  const [disableInputIsChecked, setDisableInputIsChecked] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const showModalHandler = () => {
    setshowModal(true);
  };
  const hideModalHandler = () => {
    setshowModal(false);
  };
  const onClickLogoutHandler = () => {
    dispatch(logout());
  };

  const changeBackground = () => {
    if (location.pathname === "/") {
      window.pageYOffset >= 136 ? setNavbar(true) : setNavbar(false);
    } else {
      setNavbar(true);
      window.removeEventListener("scroll", changeBackground);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setNavbar(true);
      window.removeEventListener("scroll", changeBackground);
    } else {
      window.scrollTo(window.scrollX, window.scrollY - 1);
      window.scrollTo(window.scrollX, window.scrollY + 1);
      setNavbar(false);
    }
  }, [location.pathname]);

  window.addEventListener("scroll", changeBackground);

  const navbarOnClick = () => {
    if (location.pathname !== "/") {
      setNavbar(true);
    } else {
      if (!navbar) setNavbar(!navbar);
    }
  };
  const ImageWithName = () => {
    const a = user.username ? user.username : "";
    return (
      <span className="align-slef-center">
        <img src={`/img/user/${user.profileImage}`}></img>
        <span> {a}</span>
      </span>
    );
  };
  const HeaderContentHandler = () => {
    return (
      <Nav className="ml-auto text-center">
        <LinkContainer
          to="#about"
          className="px-3"
          onClick={() => setDisableInputIsChecked(!disableInputIsChecked)}
        >
          <Nav.Link>
            <i className="fas fa-users fa-lg px-2"></i>
            About Us
          </Nav.Link>
        </LinkContainer>

        <LinkContainer
          to="/contactus"
          className="px-3"
          onClick={() => setDisableInputIsChecked(!disableInputIsChecked)}
        >
          <Nav.Link>
            <i className="fas fa-phone-alt px-2"></i>
            Contact Us
          </Nav.Link>
        </LinkContainer>

        <LinkContainer
          to="/cart"
          className="px-3"
          onClick={() => setDisableInputIsChecked(!disableInputIsChecked)}
        >
          <Nav.Link>
            <i className="fas fa-shopping-cart px-2"></i>
            Cart
          </Nav.Link>
        </LinkContainer>

        {user ? (
          <>
            <NavDropdown title={<ImageWithName />} id="username">
              <LinkContainer
                to="/profile"
                onClick={() => setDisableInputIsChecked(!disableInputIsChecked)}
              >
                <NavDropdown.Item className="text-center">
                  Profile
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item
                className="text-center"
                onClick={onClickLogoutHandler}
              >
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <>
            {/* <div
              onClick={() => setDisableInputIsChecked(!disableInputIsChecked)}
            > */}
            <Nav.Link onClick={showModalHandler}>
              <i className="fas fa-user pr-2"></i>
              Log In / Sign Up
            </Nav.Link>
            {/* </div> */}
            {showModal && (
              <Route
                render={({ history, location }) => (
                  <FormContent
                    show={showModal}
                    handleClose={hideModalHandler}
                    history={history}
                    location={location}
                  ></FormContent>
                )}
              />
            )}
          </>
        )}
      </Nav>
    );
  };
  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className={`${navbar ? "shadow active-nav" : "active-nav-inverse"}`}
      >
        <Container className={`text-center`}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="Logo"
                src={`/img/icons/${navbar ? "logo.svg" : "logo1.svg"}`}
                className="d-inline-block align-middle "
              />
              {"  "}
              <span className="align-middle h2 font-weight-bold">CakeOp</span>
            </Navbar.Brand>
          </LinkContainer>
          <div className="header-content">
            <HeaderContentHandler />
          </div>

          <nav className="mobilescreen">
            <div title="Menu" id="menuToggle">
              <input
                type="checkbox"
                onClick={navbarOnClick}
                onChange={() =>
                  setDisableInputIsChecked(!disableInputIsChecked)
                }
                checked={disableInputIsChecked}
              />
              <span className="header-nav-button"></span>
              <span className="header-nav-button"></span>
              <span className="header-nav-button"></span>
              <ul id="menu">
                <HeaderContentHandler />
              </ul>
            </div>
          </nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

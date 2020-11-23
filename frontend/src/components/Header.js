import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "./../actions/userActions";
import FormContent from "./FormContent";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showModal, setshowModal] = useState(false);
  const [disableInputIsChecked, setDisableInputIsChecked] = useState(false);

  const showModalHandler = () => {
    setshowModal(true);
  };
  const hideModalHandler = () => {
    setshowModal(false);
  };
  const onClickLogoutHandler = () => {
    dispatch(logout());
  };

  const ImageWithName = () => {
    const a = user.username ? user.username : "";
    return (
      <>
        <img src={`/img/user/${user.profileImage}`}></img>
        <span className="align-slef-center"> {a}</span>
      </>
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
    <Navbar expand="lg" bg="white" fixed="top" className="shadow">
      <Container className="text-center">
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              alt="Logo"
              src="/img/icons/logo.svg"
              className="d-inline-block align-middle"
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
              onClick={() => setDisableInputIsChecked(!disableInputIsChecked)}
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
  );
};

export default Header;

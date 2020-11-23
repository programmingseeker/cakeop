import React, { useState } from "react";
import { Container, Nav, Tab, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Settings from "../components/Settings";
import Reviews from "../components/Reviews";
import Bookings from "../components/Bookings";

function ProfilePage() {
  const [sideNav, setsideNav] = useState(false);
  const [currentTab, setCurrentTab] = useState("settings");

  const { user } = useSelector((state) => state.auth);
  const sideNavtoggle = () => {
    const a = sideNav ? false : true;
    setsideNav(a);
  };

  const curentTabHandler = (tab) => {
    setCurrentTab(tab);
  };

  const handlescreen = (tab) => {
    switch (tab) {
      case "settings":
        return <Settings />;
      case "reviews":
        return <Reviews />;
      case "bookings":
        return <Bookings />;
      default:
        return <div> this is a wrong page</div>;
    }
  };

  return (
    <Tab.Container defaultActiveKey="settings">
      <Container id="wrapper" className={`${sideNav ? "toggled" : ""}`}>
        <aside id="sidebar-wrapper">
          <Nav className="sidebar-nav" as="ul">
            <Nav.Item as="li">
              <Nav.Link
                as="div"
                className="sidenav-icon cursor-pointer "
                active={currentTab === "settings" ? true : false}
                onClick={() => curentTabHandler("settings")}
              >
                <i className="fa fa-user-cog" />
                Settings
              </Nav.Link>
            </Nav.Item>

            <Nav.Item as="li">
              <Nav.Link
                as="text"
                onClick={() => curentTabHandler("bookings")}
                active={currentTab === "bookings" ? true : false}
                className="sidenav-icon cursor-pointer"
              >
                <i className="fa fa-shopping-bag"></i>Orders
              </Nav.Link>
            </Nav.Item>

            {user.userType === "admin" ? (
              <Nav.Item as="li">
                <LinkContainer to="/admindash">
                  <Nav.Link
                    as="text"
                    onClick={() => curentTabHandler("admindash")}
                    className={`sidenav-icon cursor-pointer ${
                      currentTab === "admindash" ? "active" : ""
                    }`}
                  >
                    <i className="fa fa-tachometer-alt"></i>
                    Admin Dashboard
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ) : null}
          </Nav>
        </aside>
        <div id="navbar-wrapper">
          <Nav className="navbar">
            <div
              onClick={sideNavtoggle}
              className={`${sideNav ? "" : "navbar-inverse"}`}
            >
              <span className="sidenav-icon">
                <i className="fa fa-angle-double-right" />
              </span>
            </div>
          </Nav>
        </div>
        <section id="content-wrapper" className="overflow-auto">
          <Col lg={12}>
            <Tab.Content>{handlescreen(currentTab)}</Tab.Content>
          </Col>
        </section>
      </Container>
    </Tab.Container>
  );
}

export default ProfilePage;

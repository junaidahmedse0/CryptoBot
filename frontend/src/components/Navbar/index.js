import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import TokenService from "../../services/token.service";
import "../../App.css";
function handleScroll() {
  window.scroll({
    top: document.body.offsetHeight,
    left: 0,
    behavior: "smooth",
  });
}

const NavbarEx = (props) => {
  useEffect(() => {
    let user = TokenService.getUser();
    if (user?.accessToken.length > 0) {
      props.setIsLogged(true);
      props.setUserName(user?.name);
    }
  }, []);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="sticky-top"
    >
      <Container>
        <NavLink to="/">
          <img src={require("../../images/logo.svg")} alt="logo" />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {props.isLogged ? (
              <NavLink to="/crypto-bots">Crpto bots</NavLink>
            ) : (
              <></>
            )}
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/simulation">Simulation</NavLink>
            <div
              onClick={handleScroll}
              className="link"
              style={{ cursor: "pointer" }}
            >
              Contact
            </div>
            <NavLink to="/faq">FAQ</NavLink>
          </Nav>
          {!props.isLogged ? (
            <>
              {" "}
              <Nav>
                <NavLink to="/sign-up">SignUp</NavLink>
              </Nav>
              <Nav className="" style={{}}>
                <NavBtnLink to="/sign-in">Login</NavBtnLink>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="">
                <h5 className="pt-2 link">
                  {props.userName}
                  {"!"}
                </h5>

                <div className="d-flex  align-items-center link">
                  <div
                    className="btn btn-dark cursor-pointer"
                    onClick={() => {
                      props.setIsLogged(false);
                      TokenService.removeUser();
                    }}
                    style={{ height: "80%" }}
                  >
                    Logout
                  </div>
                </div>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarEx;

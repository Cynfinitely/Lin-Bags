import { Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Styles/Navbar.css";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="sm" bg="color-nav" variant="light" >
      <Navbar.Toggle
        aria-controls="navbarScroll"
        data-bs-target="#navbarScroll"
      />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <NavLink eventKey="1" as={Link} to="/">
            Welcome
          </NavLink>
          <NavLink eventKey="2" as={Link} to="/home">
            Home
          </NavLink>
          <NavLink eventKey="3" as={Link} to="/login">
            Login
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;

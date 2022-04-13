import React, { useContext } from 'react'
import {Navbar, Container, NavDropdown, Nav, Offcanvas, Form, FormControl, Button} from 'react-bootstrap/';
import { useNavigate, Link } from 'react-router-dom';
import { authContext } from '../providers/AuthProvider';
import { getAuth, signOut } from "firebase/auth";

export default function TopNav() {
  const navigate = useNavigate();
  const { user, resetUserInfo } = useContext(authContext);

  const firebaseSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("firebase logged out");
    }).catch((error) => {
      console.log("firebase failed to log out");
    });
  }

  const logoutHandler = () => {
    localStorage.removeItem("token");
    firebaseSignOut();
    resetUserInfo();
    navigate("/");
  };

  const token = localStorage.getItem("token");

  return (
    <div>
      <Navbar className="mid-color" expand={false}>
        <Container fluid>
          <Navbar.Brand href="#" id="navbar-title">Little Libraries of Toronto</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                {!token && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
                {token && <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>}
                {user && <Nav.Link >{user.firstName}</Nav.Link>}
                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

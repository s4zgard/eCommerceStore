import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "/logo.svg";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Link to="/" className="text-decoration-none">
            <Navbar.Brand className="d-flex align-items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "28px", width: "28px", filter: "invert(1)" }}
              />
              FooshaStore
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* Use JavaScript default parameters for clarity */}
              <Link to="/cart" className="text-decoration-none">
                <Nav.Link as="div" active={pathname === "/cart"}>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </Link>

              <Link to="/sign-in" className="text-decoration-none">
                <Nav.Link as="div" active={pathname === "/sign-in"}>
                  <FaUser /> Sign In
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

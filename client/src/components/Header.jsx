import {
  Badge,
  Container,
  Dropdown,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "/logo.svg";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSignOutMutation } from "../store/slices/userApiSlice";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";

const Header = () => {
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [signOut, { isLoading }] = useSignOutMutation();
  const dispatch = useDispatch();

  const handledLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout());
      toast.success("Sign out successful.");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "28px", width: "28px", filter: "invert(1)" }}
              />
              FooshaStore
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBar />
              <LinkContainer to="/cart">
                <Nav.Link active={pathname === "/cart"}>
                  <FaShoppingCart /> Cart{" "}
                  {cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  {userInfo.isAdmin && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Header>Admin</Dropdown.Header>

                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <Dropdown.Divider />
                    </>
                  )}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handledLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/sign-in">
                  <Nav.Link active={pathname === "/sign-in"}>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

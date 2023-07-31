// Purpose: Header component that contains the navigation bar and links to the
// cart and login page. Also contains the user's name and a dropdown menu to
// access their profile and logout.
// external imports
// bootstrap
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// react
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
// internal imports
// graphics
import logo from "../assets/styles/logo.png";
// slices
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
// types
import { CartItem } from "../types/CartItem.ts";
import { Transaction } from "../types/Transaction.ts";

const Header = () => {
  const { cartItems } = useSelector((state: Transaction) => state.cart);
  const { userInfo } = useSelector((state: Transaction) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logOutHandler = async () => {
    try {
      await logoutApiCall(undefined).unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="logo"
                width="auto"
                height="30"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc: number, item: CartItem) => {
                        return acc + item.quantity;
                      }, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={`/profile/${userInfo._id}`}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logOutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
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

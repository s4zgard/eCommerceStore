import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center">
      {step1 ? (
        <LinkContainer to="/sign-in">
          <Nav.Link>SignIn</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>SignIn</Nav.Link>
      )}
      {step2 ? (
        <LinkContainer to="/shipping">
          <Nav.Link>Shipping</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Shipping</Nav.Link>
      )}
      {step3 ? (
        <LinkContainer to="/payment">
          <Nav.Link>Payment</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Payment</Nav.Link>
      )}
      {step4 ? (
        <LinkContainer to="/placeorder">
          <Nav.Link>Place Order</Nav.Link>
        </LinkContainer>
      ) : (
        <Nav.Link disabled>Place Order</Nav.Link>
      )}
    </Nav>
  );
};
export default CheckoutSteps;

import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../store/slices/cartSlice";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartHandler = (product, qty) => {
    const item = { ...product, qty };
    dispatch(addToCart(item));
  };

  const cartRemoveHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/sign-in?redirect=/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      value={item.qty}
                      as="select"
                      onChange={(e) =>
                        cartHandler(item, Number(e.target.value))
                      }
                    >
                      {[
                        ...Array(item.countInStock)
                          .keys()
                          .map((x) => (
                            <option key={x + 1} value={Number(x + 1)}>
                              {x + 1}
                            </option>
                          )),
                      ]}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => cartRemoveHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)})
                items.
              </h2>
              ${cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                variant="dark"
                className="btn btn-block"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartPage;

import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../store.ts";
import { ProductType } from "../types/ProductType.ts";
import { ChangeEvent } from "react";
import { addToCart, removeFromCart } from "../slices/cartSlice.ts";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state: StoreState) => state.cart);
  const { cartItems } = cart;

  // to add item to cart
  const addToCartHandler = async (item: {
    product: ProductType;
    quantity: number;
  }) => {
    dispatch(addToCart(item));
  };

  // to remove item from cart
  const removeFromCartHandler = async (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  // checkout handler
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  // quantity to display
  const quantity = cartItems.reduce(
    (acc: number, item: { quantity: number }) => acc + item.quantity,
    0
  );

  // total price to display
  const total = cartItems
    .reduce(
      (acc: number, item: { quantity: number; product: ProductType }) =>
        acc + item.quantity * item.product.price,
      0
    )
    .toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(
              (item: { product: ProductType; quantity: number }) => (
                <ListGroup.Item key={item.product._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link
                        to={`/product/${item.product._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {item.product.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.product.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          addToCartHandler({
                            ...item,
                            quantity: Number(e.target.value),
                          })
                        }
                      >
                        {[...Array(item.product.countInStock).keys()].map(
                          (x: number) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                    {/*to delete item from cart*/}
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        {/*to show order summary*/}
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {quantity === 1 ? `${quantity} item` : `${quantity} items`})
              </h2>
              ${total}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;

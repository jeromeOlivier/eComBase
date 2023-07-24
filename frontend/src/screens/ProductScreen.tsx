import { ChangeEvent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating.tsx";
import { useGetProductByIdQuery } from "../slices/productsApiSlice.ts";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
import { StoreState } from "../store";
import { ProductType } from "../types/ProductType";

const ProductScreen = () => {
  const { id: productId } = useParams() as { id: string };
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const result = useGetProductByIdQuery(productId);
  const product: ProductType = result.data;
  const { isLoading, error } = result as {
    isLoading: boolean;
    error: any;
  };
  const renderErrorMessage = (err: any) => {
    const { data } = err || {};
    const { message } = data || {};
    if (typeof message === "function") {
      return message();
    } else if (typeof message === "string") {
      return message;
    }
  };

  useSelector((state: StoreState) => state.cart);
  const addToCartHandler = () => {
    dispatch(addToCart({ product: { ...product }, quantity }));
    navigate("/cart");
  };

  const isInStock: boolean = product?.countInStock > 0;
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{renderErrorMessage(error)}</Message>
      ) : (
        <>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating ?? 0}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{isInStock ? "In Stock" : "Out of Stock"}</Col>
                    </Row>
                  </ListGroup.Item>
                  {isInStock && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ): void => setQuantity(Number(event.target.value))}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (count) => (
                                <option key={count + 1} value={count + 1}>
                                  {count + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

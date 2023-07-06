import { useParams } from "react-router-dom";
import items from "../items.ts";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating.tsx";

const ProductScreen = () => {
  const { id: itemId } = useParams();
  const item = items.find((i) => i._id === itemId);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={item?.image} alt={item?.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{item?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={item?.rating ?? 0}
                text={`${item?.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${item?.price}</ListGroup.Item>
            <ListGroup.Item>Description: {item?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{item?.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {item?.countInStock ?? 0 > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={item?.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;

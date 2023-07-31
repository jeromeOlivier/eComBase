// Purpose: Component for displaying a product in the home screen
// external imports
// bootstrap
import { Card } from "react-bootstrap";
// react
import { Link } from "react-router-dom";
// internal imports
// components
import Rating from "./Rating.tsx";
// types
import { ProductType } from "../types/ProductType.ts";

const Product = ({ product }: { product: ProductType }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">{product.price}$</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

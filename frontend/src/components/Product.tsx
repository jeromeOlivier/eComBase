import { Card } from "react-bootstrap";
import { ProductType } from "../types/ProductType.ts";
import { Link } from "react-router-dom";
import Rating from "./Rating.tsx";

const Product = ({ productModel }: { productModel: ProductType }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/productModel/${productModel._id}`}>
        <Card.Img src={productModel.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/productModel/${productModel._id}`}>
          <Card.Title as="div" className="productModel-title">
            <strong>{productModel.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={productModel.rating}
            text={`${productModel.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">{productModel.price}$</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

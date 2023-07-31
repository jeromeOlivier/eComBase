// external imports
// bootstrap
import { Row, Col } from "react-bootstrap";
// internal imports
// components
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
// slices & utils
import { useGetProductsQuery } from "../slices/productsApiSlice";
import parseReduxError from "../utilities/parseReduxError.ts";
// types
import { ProductType } from "../types/ProductType.ts";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined);

  return (
    <>
      <h1>eComBase</h1>
      <h3>Products</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{parseReduxError(error)}</Message>
      ) : (
        <>
          <Row>
            {products?.map((product: ProductType) => (
              <Col key={product._id} sm={12} md={6} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;

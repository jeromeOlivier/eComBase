import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/apiSlice";
import { ProductType } from "../types/ProductType";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined);
  const renderErrorMessage = (err: any) => {
    const { data } = err || {};
    const { message } = data || {};
    if (typeof message === "function") {
      return message();
    } else if (typeof message === "string") {
      return message;
    }
  };

  return (
    <>
      <h1>eComBase</h1>
      <h3>Products</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{renderErrorMessage(error)}</Message>
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

import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { ProductType } from "../types/ProductType";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery(undefined);
  const renderErrorMessage = (err: FetchBaseQueryError | SerializedError) => {
    // Check if it's a FetchBaseQueryError
    if ("data" in err && err.data) {
      // cast the unknown data to a known type with an optional message property
      // of type string
      const data = err.data as { message?: string };
      return data.message || JSON.stringify(data);
    } else {
      return "Something went wrong";
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

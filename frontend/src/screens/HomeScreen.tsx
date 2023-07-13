import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice.ts";
import { ProductType } from "../types/ProductType.ts";
import Product from "../components/Product";
import Loader from "../components/Loader.tsx";
import Message from "../components/Message.tsx";

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
      <h1>Maîtrisez les outils de bureautique les plus en demande</h1>
      <h2>
        Devenez l'employé efficace ou le candidat que les entreprises adorent
        embaucher
      </h2>
      <h3>Les Manuels:</h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h2>
          <Message variant="danger">{renderErrorMessage(error)}</Message>
        </h2>
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

import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.tsx";
import items from "../items.ts";

const HomeScreen = () => {
  return (
    <>
      <h1>Maîtrisez les outils de bureautique les plus en demande</h1>
      <h2>
        Devenez l'employé efficace ou le candidat que les entreprises adorent
        embaucher
      </h2>
      <h3>Les Manuels:</h3>
      <Row>
        {items.map((item) => (
          <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;

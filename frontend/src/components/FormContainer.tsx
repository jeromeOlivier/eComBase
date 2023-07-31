// Purpose: Generate container for the form displayed center screen
// external imports
// bootstrap
import { Container, Row, Col } from "react-bootstrap";
// react
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const FormContainer = ({ children }: Prop) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

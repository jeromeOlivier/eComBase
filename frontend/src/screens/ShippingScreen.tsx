// Purpose: Screen for user to enter shipping information.
// external imports
// bootstrap
import { Form, Button } from "react-bootstrap";
// react
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
// internal imports
// components
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps.tsx";
// slices & utils
import { saveShippingAddress } from "../slices/cartSlice";
// types
import { Transaction } from "../types/Transaction.ts";

const ShippingScreen = () => {
  const cart = useSelector((state: Transaction) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [province, setProvince] = useState(shippingAddress.province || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, province, postalCode }));
    navigate("/payment");
    console.log("submit");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            className="mb-3"
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            className="mb-3"
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="province">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter province"
            value={province}
            className="mb-3"
            onChange={(e) => setProvince(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            className="mb-3"
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;

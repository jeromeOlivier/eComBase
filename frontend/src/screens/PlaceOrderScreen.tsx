import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps.tsx";
import Transaction from "../types/Transaction.ts";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state: Transaction) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress, navigate]);

  return <div>PlaceOrderScreen</div>;
};

export default PlaceOrderScreen;

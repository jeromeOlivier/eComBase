import { useState, useEffect, FormEvent } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Transaction from "../types/Transaction.ts";

const RegisterScreen = () => {
  // react hooks for states of email and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isAdmin = false;

  // redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state: Transaction) => state.auth);

  // search if the URL contains a "?redirect=..." query string parameter
  const { search } = useLocation(); // returns the URL query String
  // returns a URLSearchParams object instance
  const searchParams = new URLSearchParams(search);
  // returns the value of the query string parameter "redirect"
  // or "/" if it doesn't exist
  const redirect = searchParams.get("redirect") || "/";
  // if user's logged in, navigate to the redirect URL
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if credentials are valid
    const passwordMatch = password === confirmPassword;
    const isEmail = /\S+@\S+\.\S+/.test(email);
    if (!passwordMatch) {
      toast.error("Passwords do not match");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    } else if (name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    } else if (!isEmail) {
      toast.error("Invalid email");
      return;
    }
    try {
      const newUser = { name, email, password, isAdmin };
      // unwrap() is a utility function that extracts data from a fulfilled
      // promise. If the promise is rejected, unwrap() throws the error.
      // note: login comes from useLoginMutation() hook defined in userApiSlice.ts
      const response = await register(newUser).unwrap();
      // dispatch the action to set credentials in localStorage. setCredentials
      // is an action creator defined in authSlice.ts line 13
      dispatch(setCredentials({ ...response }));
      // redirect to the redirect URL
      navigate(redirect);
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            className="mb-3"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            className="mb-3"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            className="mb-3"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={confirmPassword}
            className="mb-3"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          disabled={isLoading}
          type="submit"
          variant="primary"
          className="mt-2"
        >
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          Already registered?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;

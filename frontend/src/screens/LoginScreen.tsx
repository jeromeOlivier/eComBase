import { useState, useEffect, FormEvent } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice.ts";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import RootStateType from "../types/RootStateType.ts";

const LoginScreen = () => {
  // react hooks for states of email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: RootStateType) => state.auth);

  // search if the URL contains something like "?redirect=/shipping"
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
    try {
      // unwrap() is a utility function that extracts data from a fulfilled
      // promise. If the promise is rejected, unwrap() throws the error.
      // note: login comes from useLoginMutation() hook defined in userApiSlice.ts
      console.log("email: ", email);
      console.log("password: ", password);
      const response = await login({ email, password }).unwrap();
      console.log("response: ", response);
      // dispatch the action to set credentials in localStorage. setCredentials
      // is an action creator defined in authSlice.ts line 13
      dispatch(setCredentials({ ...response }));
      // redirect to the redirect URL
      navigate(redirect);
    } catch (err) {
      console.log("err: ", err);
      toast.error("Invalid credentials");
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;

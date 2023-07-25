import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoute from "./components/PrivateRoute.tsx";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import PaymentScreen from "./screens/PaymentScreen.tsx";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeScreen />} />
            <Route path="product/:id" element={<ProductScreen />} />
            <Route path="cart" element={<CartScreen />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="register" element={<RegisterScreen />} />
            <Route path="" element={<PrivateRoute />}>
              <Route path="shipping" element={<ShippingScreen />} />
              <Route path="payment" element={<PaymentScreen />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);

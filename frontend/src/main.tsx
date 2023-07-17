import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

const rootElement = document.getElementById("root");
// @ts-ignore
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomeScreen />} />
            <Route path="product/:id" element={<ProductScreen />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);

// Purpose: PrivateRoute component for routing to private pages.
// external imports
// react
import { Outlet, Navigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// types
import { Transaction } from "../types/Transaction.ts";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: Transaction) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

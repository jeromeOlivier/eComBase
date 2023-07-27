import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Transaction from "../types/Transaction.ts";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: Transaction) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

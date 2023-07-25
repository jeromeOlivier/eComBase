import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RootStateType from "../types/RootStateType.ts";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state: RootStateType) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

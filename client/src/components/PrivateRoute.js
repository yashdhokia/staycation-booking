import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token ? (
    <Routes>
      <Route {...rest} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

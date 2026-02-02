import { Navigate } from "react-router-dom";
import  AuthCreateContext  from "../Context/AuthCreateContext.js";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const {user} = useContext(AuthCreateContext);

  // if (loading) return <div>Loading...</div>;

  // if (!user) return <Navigate to="/Login" replace />;

  // return children;

  return !user ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

import { Navigate } from "react-router";
import {jwtDecode} from "jwt-decode";

const Auth = ({ children }) => {
  const token = document.cookie
  const decoded = jwtDecode(token);


  if (token && decoded.role === "Admin") {
    
    return children;
  }

  return <Navigate to="/login" />;
};

export default Auth;

import { Navigate } from "react-router-dom";

export const PrivateAdminRoute = ({ children }) => {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (usuario.rol !== "ADMIN") {
    return <Navigate to="/home" />;
  }

  return children;
};
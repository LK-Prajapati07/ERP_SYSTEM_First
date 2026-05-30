import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "@hugeicons/core-free-icons";

const ProtectedRoute = ({
  children,
  allowedRoles
}) => {

  const {
    Auth,
    role,
    isloading
  } = useSelector(
    (state) => state.auth
  );

  if (isloading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!Auth) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
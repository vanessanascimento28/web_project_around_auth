import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
    return props.loggedIn ? Component : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

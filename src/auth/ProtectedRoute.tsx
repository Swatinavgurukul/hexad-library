import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ role, children }: any) => {
    const { user } = useAuth();
    if (!user || user.role !== role) return <Navigate to="/" />;
    return children;
};

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ role, children }: any) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/" />;

    // Admin can access everything, User can only access USER role
    if (role === "ADMIN" && user.role !== "ADMIN") {
        return <Navigate to="/user/dashboard" />;
    }

    return children;
};

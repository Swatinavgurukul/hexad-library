import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { UserDashboard } from "../user/UserDashboard";
import { AdminDashboard } from "../admin/AdminDashboard";
import LoginPage from "./LoginPage";
import { useAuth } from "../auth/AuthContext";
import Navigation from "./Navigation";

const AppRoutes: React.FC = () => {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            {user && <Navigation />}
            <Routes>
                <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/user/dashboard" />} />

                <Route
                    path="/user/dashboard"
                    element={
                        <ProtectedRoute role="USER">
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute role="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

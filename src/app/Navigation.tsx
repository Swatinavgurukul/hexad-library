import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../shared/components/Button";

const Navigation: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <h2 style={{ margin: 0 }}>📚 Hexad Library</h2>
                {user && (
                    <div style={{ display: "flex", gap: "15px" }}>
                        {user.role === "ADMIN" && (
                            <>
                                <button
                                    onClick={() => navigate("/admin/dashboard")}
                                    style={{
                                        backgroundColor: location.pathname === "/admin/dashboard" ? "#1565c0" : "transparent",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontWeight: location.pathname === "/admin/dashboard" ? "bold" : "normal"
                                    }}
                                >
                                    Admin Dashboard
                                </button>
                                <button
                                    onClick={() => navigate("/user/dashboard")}
                                    style={{
                                        backgroundColor: location.pathname === "/user/dashboard" ? "#1565c0" : "transparent",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontWeight: location.pathname === "/user/dashboard" ? "bold" : "normal"
                                    }}
                                >
                                    Browse Books
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {user && (
                    <>
                        <span>Welcome, {user.name} ({user.role})</span>
                        <Button
                            onClick={handleLogout}
                            variant="secondary"
                            style={{ backgroundColor: "white", color: "#1976d2" }}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navigation;

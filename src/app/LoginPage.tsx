import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../shared/components/Button";

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [selectedRole, setSelectedRole] = useState<"USER" | "ADMIN">("USER");

    const handleLogin = () => {
        login(selectedRole);
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5"
        }}>
            <div style={{
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                maxWidth: "400px",
                width: "100%"
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>📚 Hexad Library</h1>

                <div style={{ marginBottom: "30px" }}>
                    <p style={{ marginBottom: "15px", fontWeight: "bold" }}>Select Login Role:</p>

                    <div style={{ marginBottom: "10px" }}>
                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "10px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: selectedRole === "USER" ? "#e3f2fd" : "white" }}>
                            <input
                                type="radio"
                                value="USER"
                                checked={selectedRole === "USER"}
                                onChange={(e) => setSelectedRole(e.target.value as "USER")}
                                style={{ marginRight: "10px" }}
                            />
                            <div>
                                <strong>User</strong>
                                <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Browse and borrow books</p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "10px", border: "2px solid #ddd", borderRadius: "8px", backgroundColor: selectedRole === "ADMIN" ? "#e3f2fd" : "white" }}>
                            <input
                                type="radio"
                                value="ADMIN"
                                checked={selectedRole === "ADMIN"}
                                onChange={(e) => setSelectedRole(e.target.value as "ADMIN")}
                                style={{ marginRight: "10px" }}
                            />
                            <div>
                                <strong>Admin</strong>
                                <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Manage inventory and track borrowing</p>
                            </div>
                        </label>
                    </div>
                </div>

                <Button
                    onClick={handleLogin}
                    style={{ width: "100%", padding: "15px", marginBottom: "15px" }}
                >
                    Login as {selectedRole}
                </Button>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <button
                        onClick={handleLogin}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "white",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="18" />
                        Continue with Google
                    </button>

                    <button
                        onClick={handleLogin}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            padding: "12px",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            backgroundColor: "#24292e",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "500"
                        }}
                    >
                        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="18" style={{ filter: "invert(1)" }} />
                        Continue with GitHub
                    </button>
                </div>

                <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#fff3e0", borderRadius: "8px" }}>
                    <p style={{ fontSize: "13px", margin: 0, color: "#e65100" }}>
                        <strong>Note:</strong> Third-party buttons currently use mock login. See <code>AUTHENTICATION_SETUP.md</code> for real integration steps.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

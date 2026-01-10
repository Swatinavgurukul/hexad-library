import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    style,
    ...props
}) => {
    const baseStyle: React.CSSProperties = {
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
    };

    const variantStyles: React.CSSProperties = variant === "primary"
        ? {
            backgroundColor: "#1976d2",
            color: "white",
        }
        : {
            backgroundColor: "#f5f5f5",
            color: "#333",
        };

    return (
        <button
            style={{ ...baseStyle, ...variantStyles, ...style }}
            {...props}
        >
            {children}
        </button>
    );
};

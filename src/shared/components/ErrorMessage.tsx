import React from "react";

interface ErrorMessageProps {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "5px",
            marginBottom: "10px",
            border: "1px solid #ef5350"
        }}>
            {message}
        </div>
    );
};

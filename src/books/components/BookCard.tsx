import React from "react";
import { Book } from "../types";
import { Button } from "../../shared/components/Button";

interface BookCardProps {
    book: Book;
    onBorrow?: (id: string) => void;
    onReturn?: (id: string) => void;
    showActions?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({
    book,
    onBorrow,
    onReturn,
    showActions = true
}) => {
    const isOutOfStock = book.availableStock === 0;
    const isBorrowed = book.availableStock < book.totalStock;

    return (
        <div style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
            <h3 style={{ marginTop: 0, marginBottom: "8px" }}>{book.title}</h3>
            <p style={{ color: "#666", marginBottom: "12px" }}>by {book.author}</p>

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontSize: "14px"
            }}>
                <span>Total: <strong>{book.totalStock}</strong></span>
                <span style={{
                    color: book.availableStock > 0 ? "#2e7d32" : "#d32f2f",
                    fontWeight: "bold"
                }}>
                    Available: {book.availableStock}
                </span>
            </div>

            {isOutOfStock && (
                <div style={{
                    padding: "8px",
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    borderRadius: "4px",
                    marginBottom: "12px",
                    fontSize: "13px",
                    textAlign: "center"
                }}>
                    Out of Stock
                </div>
            )}

            {showActions && (
                <div style={{ display: "flex", gap: "8px" }}>
                    <Button
                        onClick={() => onBorrow?.(book.id)}
                        disabled={isOutOfStock}
                        style={{
                            flex: 1,
                            opacity: isOutOfStock ? 0.5 : 1,
                            cursor: isOutOfStock ? "not-allowed" : "pointer"
                        }}
                    >
                        Borrow
                    </Button>
                    {isBorrowed && onReturn && (
                        <Button
                            onClick={() => onReturn(book.id)}
                            variant="secondary"
                            style={{ flex: 1 }}
                        >
                            Return
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

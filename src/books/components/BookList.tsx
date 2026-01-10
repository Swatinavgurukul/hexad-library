import React from "react";
import { useBooks } from "../hooks/useBooks";
import { BookCard } from "./BookCard";
import { ErrorMessage } from "../../shared/components/ErrorMessage";
import { useAuth } from "../../auth/AuthContext";

export const BookList: React.FC = () => {
    const { user } = useAuth();
    const { books, borrowBook, returnBook, error, activeBorrows } = useBooks({ user });

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1>Library Books</h1>
                {user && (
                    <div style={{
                        padding: "10px 20px",
                        backgroundColor: activeBorrows.length >= 2 ? "#ffebee" : "#e8f5e9",
                        borderRadius: "8px",
                        fontWeight: "bold"
                    }}>
                        Borrowed: {activeBorrows.length}/2 books
                    </div>
                )}
            </div>

            {error && <ErrorMessage message={error} />}

            {books.length === 0 ? (
                <p>No books available in the library.</p>
            ) : (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "20px",
                    marginTop: "20px"
                }}>
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onBorrow={borrowBook}
                            onReturn={returnBook}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

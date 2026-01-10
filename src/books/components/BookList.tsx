import React from "react";
import { useBooks } from "../hooks/useBooks";
import { BookCard } from "./BookCard";
import { ErrorMessage } from "../../shared/components/ErrorMessage";

export const BookList: React.FC = () => {
    const { books, borrowBook, returnBook, error } = useBooks();

    return (
        <div style={{ padding: "20px" }}>
            <h1>Library Books</h1>

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

import React from "react";
import { BookList } from "../books/components/BookList";
import { useBooks } from "../books/hooks/useBooks";
import { useAuth } from "../auth/AuthContext";
import { BookCard } from "../books/components/BookCard";

export const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const { activeBorrows, returnBook } = useBooks({ user });

    return (
        <div style={{ padding: "20px" }}>
            {activeBorrows.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                    <h2>My Borrowed Books</h2>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "20px",
                        marginTop: "20px",
                        padding: "20px",
                        backgroundColor: "#f0f7ff",
                        borderRadius: "12px"
                    }}>
                        {activeBorrows.map((record) => (
                            <div key={record.id} style={{ position: "relative" }}>
                                <div style={{
                                    position: "absolute",
                                    top: "-10px",
                                    right: "-10px",
                                    backgroundColor: "#1976d2",
                                    color: "white",
                                    padding: "4px 8px",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    zIndex: 1
                                }}>
                                    Due: {new Date(record.dueDate).toLocaleDateString()}
                                </div>
                                <BookCard
                                    book={{
                                        id: record.bookId,
                                        title: record.bookTitle,
                                        author: record.bookAuthor,
                                        totalStock: 0,
                                        availableStock: 0
                                    }}
                                    onReturn={() => returnBook(record.bookId)}
                                    showActions={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <BookList />
        </div>
    );
};

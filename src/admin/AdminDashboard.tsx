import React, { useEffect, useState } from "react";
import { mockApi } from "../mock/mockApi";
import { Book } from "../books/types";
import { AddBookForm } from "./AddBookForm";

export const AdminDashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const loadBooks = async () => {
        setLoading(true);
        const data = await mockApi.getBooks();
        setBooks(data as Book[]);
        setLoading(false);
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const totalBooks = books.reduce((sum, book) => sum + book.totalStock, 0);
    const availableBooks = books.reduce((sum, book) => sum + book.availableStock, 0);
    const borrowedBooks = totalBooks - availableBooks;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>

            {/* Statistics Section */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
                <div style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    flex: 1
                }}>
                    <h3>Total Books</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalBooks}</p>
                </div>
                <div style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    flex: 1,
                    backgroundColor: "#e8f5e9"
                }}>
                    <h3>Available</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "#2e7d32" }}>{availableBooks}</p>
                </div>
                <div style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    flex: 1,
                    backgroundColor: "#fff3e0"
                }}>
                    <h3>Borrowed</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "#e65100" }}>{borrowedBooks}</p>
                </div>
            </div>

            {/* Add Book Form */}
            <div style={{ marginBottom: "30px" }}>
                <AddBookForm onBookAdded={loadBooks} />
            </div>

            {/* Inventory Table */}
            <div>
                <h2>Inventory</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "1px solid #ddd"
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>ID</th>
                                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Title</th>
                                <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Author</th>
                                <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Total Stock</th>
                                <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Available</th>
                                <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Borrowed</th>
                                <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.id}>
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{book.id}</td>
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{book.title}</td>
                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{book.author}</td>
                                    <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>{book.totalStock}</td>
                                    <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>{book.availableStock}</td>
                                    <td style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>{book.totalStock - book.availableStock}</td>
                                    <td style={{
                                        padding: "12px",
                                        textAlign: "center",
                                        border: "1px solid #ddd",
                                        color: book.availableStock > 0 ? "#2e7d32" : "#d32f2f",
                                        fontWeight: "bold"
                                    }}>
                                        {book.availableStock > 0 ? "In Stock" : "Out of Stock"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

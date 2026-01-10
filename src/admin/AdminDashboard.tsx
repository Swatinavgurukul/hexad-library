import React, { useEffect, useState } from "react";
import { mockApi } from "../mock/mockApi";
import { Book, BorrowRecord } from "../books/types";
import { AddBookForm } from "./AddBookForm";

export const AdminDashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"inventory" | "borrows">("inventory");

    const loadBooks = async () => {
        setLoading(true);
        const data = await mockApi.getBooks();
        setBooks(data as Book[]);
        setLoading(false);
    };

    const loadBorrowRecords = async () => {
        const records = await mockApi.getBorrowRecords();
        setBorrowRecords(records as BorrowRecord[]);
    };

    useEffect(() => {
        loadBooks();
        loadBorrowRecords();
    }, []);

    const totalBooks = books.reduce((sum, book) => sum + book.totalStock, 0);
    const availableBooks = books.reduce((sum, book) => sum + book.availableStock, 0);
    const borrowedBooks = totalBooks - availableBooks;
    const activeBorrows = borrowRecords.filter(r => r.status === "borrowed");

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
                <div style={{
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    flex: 1,
                    backgroundColor: "#e3f2fd"
                }}>
                    <h3>Active Loans</h3>
                    <p style={{ fontSize: "24px", fontWeight: "bold", color: "#1565c0" }}>{activeBorrows.length}</p>
                </div>
            </div>

            {/* Add Book Form */}
            <div style={{ marginBottom: "30px" }}>
                <AddBookForm onBookAdded={() => {
                    loadBooks();
                    loadBorrowRecords();
                }} />
            </div>

            {/* Tabs */}
            <div style={{ marginBottom: "20px", borderBottom: "2px solid #ddd" }}>
                <button
                    onClick={() => setActiveTab("inventory")}
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        backgroundColor: "transparent",
                        borderBottom: activeTab === "inventory" ? "3px solid #1976d2" : "none",
                        fontWeight: activeTab === "inventory" ? "bold" : "normal",
                        cursor: "pointer",
                        fontSize: "16px"
                    }}
                >
                    Inventory
                </button>
                <button
                    onClick={() => setActiveTab("borrows")}
                    style={{
                        padding: "10px 20px",
                        border: "none",
                        backgroundColor: "transparent",
                        borderBottom: activeTab === "borrows" ? "3px solid #1976d2" : "none",
                        fontWeight: activeTab === "borrows" ? "bold" : "normal",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginLeft: "10px"
                    }}
                >
                    Borrowing Records
                </button>
            </div>

            {/* Content */}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {activeTab === "inventory" && (
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

                    {activeTab === "borrows" && (
                        <div>
                            <h2>Who Borrowed What</h2>
                            {activeBorrows.length === 0 ? (
                                <p>No active borrowing records.</p>
                            ) : (
                                <table style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    border: "1px solid #ddd"
                                }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>User</th>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Book Title</th>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Borrow Date</th>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Due Date</th>
                                            <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeBorrows.map((record) => {
                                            const isOverdue = new Date(record.dueDate) < new Date();
                                            return (
                                                <tr key={record.id} style={{
                                                    backgroundColor: isOverdue ? "#fff3e0" : "white"
                                                }}>
                                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{record.userName}</td>
                                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>{record.bookTitle}</td>
                                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                                        {new Date(record.borrowDate).toLocaleDateString()}
                                                    </td>
                                                    <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                                        {new Date(record.dueDate).toLocaleDateString()}
                                                    </td>
                                                    <td style={{
                                                        padding: "12px",
                                                        textAlign: "center",
                                                        border: "1px solid #ddd",
                                                        color: isOverdue ? "#d32f2f" : "#2e7d32",
                                                        fontWeight: "bold"
                                                    }}>
                                                        {isOverdue ? "Overdue" : "Active"}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            )}

                            <h2 style={{ marginTop: "40px" }}>Borrowing History (All Records)</h2>
                            {borrowRecords.length === 0 ? (
                                <p>No borrowing history.</p>
                            ) : (
                                <table style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    border: "1px solid #ddd"
                                }}>
                                    <thead>
                                        <tr style={{ backgroundColor: "#f5f5f5" }}>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>User</th>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Book</th>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Borrowed</th>
                                            <th style={{ padding: "12px", textAlign: "left", border: "1px solid #ddd" }}>Returned</th>
                                            <th style={{ padding: "12px", textAlign: "center", border: "1px solid #ddd" }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {borrowRecords.sort((a, b) =>
                                            new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime()
                                        ).map((record) => (
                                            <tr key={record.id}>
                                                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{record.userName}</td>
                                                <td style={{ padding: "12px", border: "1px solid #ddd" }}>{record.bookTitle}</td>
                                                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                                    {new Date(record.borrowDate).toLocaleDateString()}
                                                </td>
                                                <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                                                    {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : "-"}
                                                </td>
                                                <td style={{
                                                    padding: "12px",
                                                    textAlign: "center",
                                                    border: "1px solid #ddd",
                                                    color: record.status === "borrowed" ? "#1976d2" : "#757575",
                                                    fontWeight: "bold"
                                                }}>
                                                    {record.status === "borrowed" ? "Borrowed" : "Returned"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

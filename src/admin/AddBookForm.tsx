import React, { useState } from "react";
import { mockApi } from "../mock/mockApi";
import { Button } from "../shared/components/Button";
import { ErrorMessage } from "../shared/components/ErrorMessage";

export const AddBookForm: React.FC<{ onBookAdded: () => void }> = ({ onBookAdded }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        totalStock: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!formData.title || !formData.author || formData.totalStock <= 0) {
            setError("Please fill all fields with valid values");
            return;
        }

        try {
            await mockApi.addBook({
                ...formData,
                availableStock: formData.totalStock,
            });
            setSuccess(true);
            setFormData({ title: "", author: "", totalStock: 0 });
            onBookAdded();
        } catch (e: any) {
            setError(e.message || "Failed to add book");
        }
    };

    return (
        <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                    />
                </div>
                <div style={{ marginBottom: "15px" }}>
                    <label>Total Stock:</label>
                    <input
                        type="number"
                        value={formData.totalStock}
                        onChange={(e) => setFormData({ ...formData, totalStock: parseInt(e.target.value) })}
                        style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                        min="1"
                    />
                </div>
                {error && <ErrorMessage message={error} />}
                {success && <div style={{ color: "green", marginBottom: "10px" }}>Book added successfully!</div>}
                <Button type="submit">Add Book</Button>
            </form>
        </div>
    );
};

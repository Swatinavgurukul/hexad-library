import { useEffect, useState } from "react";
import { mockApi } from "../../mock/mockApi";
import { Book, BorrowRecord } from "../types";

interface UseBooks {
    user: { id: string; name: string } | null;
}

export const useBooks = ({ user }: UseBooks) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [activeBorrows, setActiveBorrows] = useState<BorrowRecord[]>([]);

    const loadBooks = async () => {
        const data = await mockApi.getBooks();
        setBooks(data as Book[]);
    };

    const loadActiveBorrows = async () => {
        if (user) {
            const active = await mockApi.getActiveBorrowsByUser(user.id);
            setActiveBorrows(active as BorrowRecord[]);
        }
    };

    useEffect(() => {
        loadBooks();
        loadActiveBorrows();
    }, [user?.id]);

    const borrowBook = async (id: string) => {
        if (!user) {
            setError("Please login to borrow books");
            return;
        }

        try {
            await mockApi.borrowBook(id, user.id, user.name);
            await loadBooks();
            await loadActiveBorrows();
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const returnBook = async (id: string) => {
        if (!user) {
            setError("Please login to return books");
            return;
        }

        try {
            await mockApi.returnBook(id, user.id);
            await loadBooks();
            await loadActiveBorrows();
            setError(null);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return { books, borrowBook, returnBook, error, activeBorrows };
};

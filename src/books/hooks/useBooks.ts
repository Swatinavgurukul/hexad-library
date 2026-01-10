import { useEffect, useState } from "react";
import { mockApi } from "../../mock/mockApi";
import { Book } from "../types";

export const useBooks = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        mockApi.getBooks().then(setBooks);
    }, []);

    const borrowBook = async (id: string) => {
        try {
            await mockApi.borrowBook(id);
            setBooks([...books]);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const returnBook = async (id: string) => {
        try {
            await mockApi.returnBook(id);
            setBooks([...books]);
        } catch (e: any) {
            setError(e.message);
        }
    };

    return { books, borrowBook, returnBook, error };
};

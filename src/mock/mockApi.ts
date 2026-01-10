import { books } from "./mockData";
import { Book } from "../books/types";

export const mockApi = {
    getBooks: async () => {
        return new Promise((resolve) =>
            setTimeout(() => resolve(books), 500)
        );
    },

    borrowBook: async (bookId: string) => {
        const book = books.find(b => b.id === bookId);
        if (!book || book.availableStock <= 0) {
            throw new Error("Book not available");
        }
        book.availableStock -= 1;
        return book;
    },

    returnBook: async (bookId: string) => {
        const book = books.find(b => b.id === bookId);
        if (!book || book.availableStock >= book.totalStock) {
            throw new Error("Invalid return");
        }
        book.availableStock += 1;
        return book;
    },

    addBook: async (bookData: Omit<Book, "id">) => {
        const newBook: Book = {
            id: Date.now().toString(),
            ...bookData,
        };
        books.push(newBook);
        return new Promise((resolve) =>
            setTimeout(() => resolve(newBook), 300)
        );
    }
};

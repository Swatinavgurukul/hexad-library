import { books } from "./mockData";

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
    }
};

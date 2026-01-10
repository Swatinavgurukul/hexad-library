import { books, borrowRecords } from "./mockData";
import { Book, BorrowRecord } from "../books/types";

export const mockApi = {
    getBooks: async () => {
        return new Promise((resolve) =>
            setTimeout(() => resolve(books), 500)
        );
    },

    borrowBook: async (bookId: string, userId: string, userName: string) => {
        const book = books.find(b => b.id === bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        if (book.availableStock <= 0) {
            throw new Error("Book not available - out of stock");
        }

        // Check 2-book limit
        const userActiveBorrows = borrowRecords.filter(
            r => r.userId === userId && r.status === "borrowed"
        ).length;

        if (userActiveBorrows >= 2) {
            throw new Error("You've reached the maximum borrowing limit (2 books). Please return a book first.");
        }

        // Create borrow record
        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

        const record: BorrowRecord = {
            id: Date.now().toString(),
            bookId: book.id,
            userId,
            userName,
            bookTitle: book.title,
            bookAuthor: book.author,
            borrowDate,
            dueDate,
            status: "borrowed"
        };

        borrowRecords.push(record);
        book.availableStock -= 1;

        return new Promise((resolve) =>
            setTimeout(() => resolve(book), 300)
        );
    },

    returnBook: async (bookId: string, userId: string) => {
        const book = books.find(b => b.id === bookId);
        if (!book) {
            throw new Error("Book not found");
        }

        // Find active borrow record for this user and book
        const borrowRecord = borrowRecords.find(
            r => r.bookId === bookId && r.userId === userId && r.status === "borrowed"
        );

        if (!borrowRecord) {
            throw new Error("You haven't borrowed this book or it's already returned");
        }

        // Prevent over-returning
        if (book.availableStock >= book.totalStock) {
            throw new Error("Invalid return - stock already at maximum");
        }

        // Update record
        borrowRecord.returnDate = new Date();
        borrowRecord.status = "returned";
        book.availableStock += 1;

        return new Promise((resolve) =>
            setTimeout(() => resolve(book), 300)
        );
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
    },

    getBorrowRecords: async () => {
        return new Promise<BorrowRecord[]>((resolve) =>
            setTimeout(() => resolve(borrowRecords), 300)
        );
    },

    getActiveBorrowsByUser: async (userId: string) => {
        const active = borrowRecords.filter(
            r => r.userId === userId && r.status === "borrowed"
        );
        return new Promise((resolve) =>
            setTimeout(() => resolve(active), 300)
        );
    }
};

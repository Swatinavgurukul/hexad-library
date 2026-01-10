import { mockApi } from "../mock/mockApi";
import { books, borrowRecords } from "../mock/mockData";
import { BorrowRecord } from "../books/types";

// Reset state before each test
beforeEach(() => {
    // Reset books to original state
    books.forEach(book => {
        book.availableStock = book.totalStock;
    });
    // Clear borrow records
    borrowRecords.length = 0;
});

describe("Book Borrowing and Returning", () => {
    test("should not allow borrowing when stock is zero", async () => {
        const book = books[0];
        book.availableStock = 0;

        await expect(
            mockApi.borrowBook(book.id, "user1", "Test User")
        ).rejects.toThrow("Book not available - out of stock");
    });

    test("should successfully borrow a book when stock is available", async () => {
        const book = books[0];
        const initialStock = book.availableStock;

        await mockApi.borrowBook(book.id, "user1", "Test User");

        expect(book.availableStock).toBe(initialStock - 1);
        expect(borrowRecords.length).toBe(1);
        expect(borrowRecords[0].userId).toBe("user1");
        expect(borrowRecords[0].bookId).toBe(book.id);
        expect(borrowRecords[0].status).toBe("borrowed");
    });

    test("should not allow borrowing more than 2 books", async () => {
        const book1 = books[0];
        const book2 = books[1];
        const book3 = books[2];

        // Borrow first book
        await mockApi.borrowBook(book1.id, "user1", "Test User");
        expect(borrowRecords.length).toBe(1);

        // Borrow second book
        await mockApi.borrowBook(book2.id, "user1", "Test User");
        expect(borrowRecords.length).toBe(2);

        // Try to borrow third book - should fail
        await expect(
            mockApi.borrowBook(book3.id, "user1", "Test User")
        ).rejects.toThrow("You've reached the maximum borrowing limit (2 books)");

        expect(borrowRecords.length).toBe(2);
    });

    test("should successfully return a borrowed book", async () => {
        const book = books[0];
        const initialStock = book.availableStock;

        // First borrow the book
        await mockApi.borrowBook(book.id, "user1", "Test User");
        expect(book.availableStock).toBe(initialStock - 1);

        // Then return it
        await mockApi.returnBook(book.id, "user1");
        expect(book.availableStock).toBe(initialStock);
        expect(borrowRecords[0].status).toBe("returned");
        expect(borrowRecords[0].returnDate).toBeDefined();
    });

    test("should not allow returning a book that wasn't borrowed", async () => {
        const book = books[0];

        await expect(
            mockApi.returnBook(book.id, "user1")
        ).rejects.toThrow("You haven't borrowed this book");
    });

    test("should not allow over-returning (returning more than borrowed)", async () => {
        const book = books[0];

        // Borrow and return once
        await mockApi.borrowBook(book.id, "user1", "Test User");
        await mockApi.returnBook(book.id, "user1");

        // Try to return again - should fail
        await expect(
            mockApi.returnBook(book.id, "user1")
        ).rejects.toThrow("You haven't borrowed this book");
    });

    test("should allow user to borrow again after returning a book", async () => {
        const book1 = books[0];
        const book2 = books[1];
        const book3 = books[2];

        // Borrow 2 books (at limit)
        await mockApi.borrowBook(book1.id, "user1", "Test User");
        await mockApi.borrowBook(book2.id, "user1", "Test User");

        // Can't borrow a third
        await expect(
            mockApi.borrowBook(book3.id, "user1", "Test User")
        ).rejects.toThrow("maximum borrowing limit");

        // Return one book
        await mockApi.returnBook(book1.id, "user1");

        // Now should be able to borrow again
        await mockApi.borrowBook(book3.id, "user1", "Test User");

        const userActiveRecords = borrowRecords.filter(
            r => r.userId === "user1" && r.status === "borrowed"
        );
        expect(userActiveRecords.length).toBe(2);
    });

    test("should track different users separately", async () => {
        const book1 = books[0];
        const book2 = books[1];

        // User 1 borrows a book
        await mockApi.borrowBook(book1.id, "user1", "User One");

        // User 2 borrows a different book
        await mockApi.borrowBook(book2.id, "user2", "User Two");

        const user1Records = borrowRecords.filter(r => r.userId === "user1");
        const user2Records = borrowRecords.filter(r => r.userId === "user2");

        expect(user1Records.length).toBe(1);
        expect(user2Records.length).toBe(1);
        expect(user1Records[0].bookId).toBe(book1.id);
        expect(user2Records[0].bookId).toBe(book2.id);
    });

    test("should set due date to 14 days from borrow date", async () => {
        const book = books[0];

        await mockApi.borrowBook(book.id, "user1", "Test User");

        const record = borrowRecords[0];
        const borrowDate = new Date(record.borrowDate);
        const dueDate = new Date(record.dueDate);

        const daysDifference = Math.floor(
            (dueDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        expect(daysDifference).toBe(14);
    });
});

describe("Admin Features", () => {
    test("should add a new book to inventory", async () => {
        const initialCount = books.length;

        const newBook = await mockApi.addBook({
            title: "New Test Book",
            author: "Test Author",
            totalStock: 5,
            availableStock: 5
        });

        expect(books.length).toBe(initialCount + 1);
        expect(newBook).toBeDefined();
    });

    test("should get all borrow records", async () => {
        const book1 = books[0];
        const book2 = books[1];

        await mockApi.borrowBook(book1.id, "user1", "User One");
        await mockApi.borrowBook(book2.id, "user2", "User Two");

        const records = await mockApi.getBorrowRecords();
        expect(records).toHaveLength(2);
    });

    test("should get active borrows for specific user", async () => {
        const book1 = books[0];
        const book2 = books[1];

        await mockApi.borrowBook(book1.id, "user1", "User One");
        await mockApi.borrowBook(book2.id, "user2", "User Two");

        const user1Borrows = await mockApi.getActiveBorrowsByUser("user1") as BorrowRecord[];
        expect(user1Borrows).toHaveLength(1);
        expect(user1Borrows[0].userId).toBe("user1");
    });
});

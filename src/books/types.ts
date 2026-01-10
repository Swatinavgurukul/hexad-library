export interface Book {
    id: string;
    title: string;
    author: string;
    totalStock: number;
    availableStock: number;
}

export interface BorrowRecord {
    id: string;
    bookId: string;
    userId: string;
    userName: string;
    bookTitle: string;
    bookAuthor: string;
    borrowDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: "borrowed" | "returned";
}

import { Book, BorrowRecord } from "../books/types";

export let books: Book[] = [
    {
        id: "1",
        title: "Clean Code",
        author: "Robert C. Martin",
        totalStock: 3,
        availableStock: 3,
    },
    {
        id: "2",
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt & David Thomas",
        totalStock: 2,
        availableStock: 2,
    },
    {
        id: "3",
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        totalStock: 4,
        availableStock: 4,
    },
    {
        id: "4",
        title: "Design Patterns",
        author: "Gang of Four",
        totalStock: 2,
        availableStock: 2,
    },
];

export let borrowRecords: BorrowRecord[] = [];

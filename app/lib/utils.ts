import { Book } from "./Types";

export const extractBooks = (library: {book: Book}[]): Book[] => library.map(x => ({...x.book, isbn: x.book["ISBN"]}))

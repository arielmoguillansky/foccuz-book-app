import { Book } from "./Types";

export const extractBooks = (library: {book: Book}[]): Book[] => library.map(x => ({...x.book, isbn: x.book["ISBN"]}))

export async function fetchData() {
  const dataUrl = process.env.NEXT_PUBLIC_DATA_URL;
  if (!dataUrl) {
    throw new Error("NEXT_PUBLIC_DATA_URL is not defined");
  }

  const res = await fetch(dataUrl, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.status}`);
  }
  return res.json();
}
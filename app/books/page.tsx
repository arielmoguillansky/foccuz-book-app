import { Book, Library } from "@/app/lib/Types";
import { extractBooks } from "@/app/lib/utils";
import { BookList } from "../ui/components/BookList";

async function getData() {
  const data = await fetch(`https://gitlab.com/-/snippets/4789289/raw/main/data.json`, {
    cache: 'force-cache',
  })
  const {library}: Library = await data.json()
  const books: Book[] = extractBooks(library)
  return books;
}

import { useState } from "react";
import React from 'react';

export default async function BooksPage() {
  const books = await getData();
  return <ClientComponent books={books} />;
}

const ClientComponent: React.FC<{ books: Book[] }> = ({ books }) => {
  const [search, setSearch] = useState("");

  const filteredBooks = search
    ? books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      )
    : books;

  return (
    <div className="">
      <h1>Catálogo de libros</h1>
      <input
        type="text"
        placeholder="Search books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <BookList books={filteredBooks} />
    </div>
  );
};

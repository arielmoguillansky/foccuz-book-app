import { Book, Library } from "@/app/lib/Types";
import { extractBooks } from "@/app/lib/utils";
import { BookList } from "../ui/components/BookList";

async function getData(searchQuery?: string) {
  const data = await fetch(
    `https://gitlab.com/-/snippets/4789289/raw/main/data.json`
  );
  const { library }: Library = await data.json();
  const books: Book[] = extractBooks(library);
  if (searchQuery) {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return books;
}

export default async function BooksPage({
  searchParams,
}: {
  searchParams?: { search?: string };
  page?: string;
}) {
  const searchQuery = searchParams?.search || "";
  const books = await getData(searchQuery);

  return (
    <div className="max-w-[1024px] mx-auto md:p-8 p-4 min-h-[calc(100vh-145px)]">
      <div className="flex items-center gap-x-6 mb-8">
        <h1 className="md:text-4xl text-xl whitespace-nowrap">
          Todos los libros
        </h1>
        <hr className="h-[0.25px] border-0 bg-violet-500 w-full" />
      </div>
      <BookList books={books} />
    </div>
  );
}

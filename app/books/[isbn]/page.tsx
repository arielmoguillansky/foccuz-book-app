import { Book } from "@/app/lib/Types";
import { extractBooks, fetchData } from "@/app/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// Next.js utiliza APIs como generateMetadata y generateStaticParams donde se puede usar los mismos datos de la página.
// Al utilizar fetch, los requests pueden ser memoizadas mediante la adición de cache: 'force-cache'.
// Esto quiere decir que solo se va a realizar una única solicitud. Ayuda a optimizar la cantidad de requests que se realizan.

// Con revalidate se puede establecer el tiempo en segundos que se va a esperar antes de volver a generar la página.
export const revalidate = 3600;

// Se pre-renderizarán únicamente los parámetros provenientes de `generateStaticParams` durante el build time.
export const dynamicParams = true;

async function getBook(isbn: string): Promise<Book> {
  const { library } = await fetchData();
  const extractedBooks: Book[] = extractBooks(library);
  // Busco el primer libro que coincida con el ISBN
  const book = extractedBooks.find((book) => book.ISBN === isbn);
  if (!book) notFound();
  return book;
}

export async function generateStaticParams() {
  const { library } = await fetchData();
  // Decidí utilzar el ISBN como parámetro para la página de detalle de un libro.
  return library.map((book: Book) => ({ isbn: String(book.ISBN) }));
}

export async function generateMetadata({
  params,
}: {
  params: { isbn: string };
}) {
  const book = await getBook(params.isbn);
  return { title: book.title };
}

export default async function BookPage({
  params,
}: {
  params: { isbn: string };
}) {
  // Obtengo el ISBN del libro proveniente del parámetro de la url
  const book = await getBook(params.isbn);

  return (
    <section className="min-h-[calc(100vh-57px)] max-w-[1024px] mx-auto md:p-8 p-4">
      <div className="flex items-center gap-x-6 mb-8">
        <h1 className="md:text-4xl text-xl whitespace-nowrap">{book.title}</h1>
        <hr className="h-[0.25px] border-0 bg-violet-500 w-full" />
      </div>
      <div className="w-full flex md:flex-row flex-col-reverse md:gap-x-8 gap-y-8 justify-center items-center mb-16">
        <div className="w-3/4 aspect-ratio-250-400 relative">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="border border-violet-500 rounded-xl p-8">
          <p>
            <span className="text-violet-600 text-xs uppercase font-sans mr-1">
              Título:
            </span>{" "}
            {book.title}
          </p>
          <p>
            <span className="text-violet-600 text-xs uppercase font-sans mr-1">
              Autor:
            </span>{" "}
            {book.author.name}
          </p>
          <p>
            <span className="text-violet-600 text-xs uppercase font-sans mr-1">
              Año:
            </span>{" "}
            {book.year}
          </p>
          <p>
            <span className="text-violet-600 text-xs uppercase font-sans mr-1">
              ISBN:
            </span>{" "}
            {book.ISBN}
          </p>
          <p>
            <span className="text-violet-600 text-xs uppercase font-sans mr-1">
              Hojas:
            </span>{" "}
            {book.pages}
          </p>
          <p>
            <span className="text-violet-600 text-xs uppercase font-sans mr-1">
              Género:
            </span>{" "}
            {book.genre}
          </p>
          <hr className="my-2 text-violet-400" />
          <span className="text-violet-600 text-xs uppercase font-sans mb-1">
            Sinopsis:
          </span>
          <p>{book.synopsis}</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-x-6 mb-8">
          <h1 className="md:text-4xl text-xl whitespace-nowrap">
            Otros títulos escritos por {book.author.name}
          </h1>
          <hr className="h-[0.25px] border-0 bg-violet-500 w-full" />
        </div>
        <ul>
          {book.author.otherBooks.map((title, idx) => (
            <li
              key={`related-book-${idx}`}
              className="flex w-full items-center border-violet-500 border-b md:p-5 py-5 p-3"
            >
              <h2 className="md:text-xl text-sm font-bold">{title}</h2>
            </li>
          ))}
        </ul>
      </div>
      <Link
        href="/books"
        className="font-sans font-semibold text-violet-500 mt-8 text-md flex gap-x-2"
      >
        <Image
          src="/images/chevron-left.svg"
          alt="Volver"
          width={16}
          height={16}
        />
        Ver todos
      </Link>
    </section>
  );
}

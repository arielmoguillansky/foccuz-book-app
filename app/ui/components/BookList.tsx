'use client'
import { JSX, useState, createContext } from "react";
import { Book } from "@/app/lib/Types";
import Link from "next/link";
import Image from "next/image";
import { ToggleLayout } from "./ToggleLayout";
import { Search } from "./Search";

interface BookListProps {
  books: Book[];
}

const BookCard = ({
  title,
  genre,
  ISBN,
  author,
  cover,
}: Book & { layout: string }) => {
  const [imgSrc, setImgSrc] = useState(cover);
  return (
    <div>
      <Link
        href={`/books/${ISBN}`}
        className={
          "block relative border-violet-500 rounded-xl border md:p-5 p-3 book-card max-w-[340px]"
        }
      >
        <div className="absolute bg-violet-400 font-medium text-(--chalk) rounded-sm font-sans uppercase flex items-center justify-center p-1 md:p-2 top-4 md:-right-4 -right-2 z-10 genre-label md:text-md text-xs">
          {genre}
        </div>
        <div className={`relative w-full h-full aspect-ratio-250-400 mb-6`}>
          <Image
            className="rounded-xl"
            priority
            src={imgSrc}
            alt={title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            onError={() => {
              setImgSrc("/images/no-cover.png");
            }}
          />
        </div>
        <div className="min-h-[120px]">
          <p className="font-sans font-light text-xs md:text-base mb-2 md:mb-4">
            {author.name}
          </p>
          <h2 className="md:text-xl text-lg font-bold leading-snug">{title}</h2>
        </div>
      </Link>
    </div>
  );
};

export const BookRow = ({
  title,
  genre,
  ISBN,
  author,
}: Book & { layout: string }) => {
  return (
    <Link
      href={`/books/${ISBN}`}
      className="flex w-full flex-row-reverse justify-between items-center border-violet-500 border-b md:p-5 py-5 p-3 book-row"
    >
      <div className="bg-violet-400 font-medium text-(--chalk) rounded-sm text-xs font-sans uppercase flex items-center justify-center p-1 md:p-2 z-10 genre-label h-fit whitespace-nowrap">
        {genre}
      </div>
      <div>
        <p className="font-sans font-light text-xs md:text-base mb-2 md:mb-4">
          {author.name}
        </p>
        <h2 className="md:text-xl text-lg font-bold leading-snug">{title}</h2>
      </div>
    </Link>
  );
};
interface ThemeContextType {
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  layout: "list",
  setLayout: () => {},
});
const renderBookItem = (book: Book, idx: number, layout: string) => {
  if (layout === "grid") {
    return <BookCard key={`book-item-${idx}`} {...book} layout={layout} />;
  } else {
    return <BookRow key={`book-item-${idx}`} {...book} layout={layout} />;
  }
};
export const BookList = ({ books }: BookListProps): JSX.Element => {
  const [layout, setLayout] = useState("grid");
  const isGridLayout = layout === "grid";
  const value = {
    layout,
    setLayout,
  };

  return (
    <ThemeContext.Provider value={value}>
      <section className="mx-auto">
        <div className="flex gap-x-2 sticky top-0 z-20 py-4 before:absolute before:content-[''] before:w-screen before:h-full before:bg-(--chalk) before:left-1/2 before:-translate-1/2 before:top-1/2 before:-z-10 before:opacity-95">
          <Search />
          <ToggleLayout />
        </div>
        <div
          className={
            isGridLayout
              ? "grid md:grid-cols-3 grid-cols-2 md:gap-8 gap-4 place-self-center w-full"
              : "flex flex-col"
          }
        >
          {books.map((book: Book, idx: number) =>
            renderBookItem(book, idx, layout)
          )}
        </div>
      </section>
    </ThemeContext.Provider>
  );
};

'use client'
import { JSX, useState, createContext, useEffect, useRef } from "react";
import { Book } from "@/app/lib/Types";
import { ToggleLayout } from "./ToggleLayout";
import { Search } from "./Search";
import { BookCard } from "./BookCard";
import { BookRow } from "./BookRow";

interface BookListProps {
  books: Book[];
}

interface ThemeContextType {
  layout: string;
  setLayout: React.Dispatch<React.SetStateAction<string>>;
}

// El uso de context es para poder compartir el estado del layout entre los componentes
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
  const [isStuck, setIsStuck] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const value = {
    layout,
    setLayout,
  };

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting);
      },
      { rootMargin: "-17px 0px 0px 0px", threshold: 1 }
    );

    observer.observe(header);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeContext.Provider value={value}>
      <section className="mx-auto">
        <div
          ref={headerRef}
          className={`flex gap-x-2 sticky top-0 z-20 py-4 before:absolute before:content-[''] before:w-screen before:h-full before:bg-white before:left-1/2 before:-translate-1/2 before:top-1/2 before:-z-10 transition-shadow duration-1000 ${
            isStuck ? "before:shadow-md before:opacity-75" : "before:opacity-0"
          }`}
        >
          <Search />
          <ToggleLayout />
        </div>
        {books?.length ? (
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
        ) : (
          <div className="font-sans text-violet-950">
            No se encontraron resultados
          </div>
        )}
      </section>
    </ThemeContext.Provider>
  );
};

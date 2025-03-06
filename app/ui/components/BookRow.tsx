"use client"
import { Book } from "@/app/lib/Types";
import Link from "next/link";

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
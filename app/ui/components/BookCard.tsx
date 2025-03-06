"use client"
import { Book } from "@/app/lib/Types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const BookCard = ({
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
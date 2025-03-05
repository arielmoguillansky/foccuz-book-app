'use client'
import { JSX, useState } from 'react'
import { Book } from "@/app/lib/Types"
import Link from "next/link"
import Image from 'next/image';

interface BookListProps {
  books: Book[];
}

export const BookList = ({books}: BookListProps): JSX.Element => {
  const [layout, setLayout] = useState('grid')
  const handleLayoutChange = () => {
    setLayout(layout === 'grid' ? 'list' : 'grid')
  }
  return(
    <section>
      <div className='flex'>
        <button onClick={handleLayoutChange} className={layout === 'grid' ? 'bg-amber-300' : ''}>grid</button>
        <button onClick={handleLayoutChange} className={layout === 'list' ? 'bg-amber-300' : ''}>list</button>
      </div>
      <div className={layout === 'grid' ? 'grid grid-cols-3' : 'flex flex-col'}>

        {books.map((book: Book, idx: number) => (
          <Link href={`/books/${book["ISBN"]}`} key={`book-item-${idx}`} className={layout === 'grid' ? 'block' : 'flex w-full'}>
            <Image src={book.cover} alt={book.title} width={100} height={100}/>
            <div>
              <h2>{book.title}</h2>
              <p>{book.pages}</p>
              <p>{book.genre}</p>
              <p>{book.synopsis}</p>
              <p>{book.year}</p>
              <p>{book["ISBN"]}</p>
              <p>{book.author.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
import { Book } from '@/app/lib/Types'
import { extractBooks } from '@/app/lib/utils'
import Image from 'next/image'
import { notFound } from 'next/navigation'
//Next.js uses APIs like generateMetadata and generateStaticParams where you will need to use the same data fetched in the page.
// If you are using fetch, requests can be memoized by adding cache: 'force-cache'. This means you can safely call the same URL with the same options, and only one request will be made.

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3600
 
// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths


async function getBook(isbn: string) {
  const res = await fetch(`https://gitlab.com/-/snippets/4789289/raw/main/data.json`, {
    cache: 'force-cache',
  })
  const {library} = await res.json()
  
  const extractedBooks: Book[] = extractBooks(library)
  const book: Book | undefined = extractedBooks.find((book: Book) => book["ISBN"] === isbn)
  if (!book) notFound()
  return book
}
 
export async function generateStaticParams() {
  const {library} = await fetch('https://gitlab.com/-/snippets/4789289/raw/main/data.json', {
    cache: 'force-cache',
  }).then((res) => res.json())
 
  return library.map((book: Book) => ({
    isbn: String(book["ISBN"]),
  }))
}
 
export async function generateMetadata({
  params,
}: {
  params: Promise<{ isbn: string }>
}) {
  const { isbn } = await params
  const book = await getBook(isbn)
 
  return {
    title: book.title,
  }
}
 
export default async function BookPage({
  params,
}: {
  params: Promise<{ isbn: string }>
}) {
  const { isbn } = await params
  const book = await getBook(isbn)
 
  return (
    <article>
      <Image src={book.cover} alt={book.title} width={500} height={500}/>
      <h1>{book.title}</h1>
      <p>{book.pages}</p>
      <p>{book.genre}</p>
      <p>{book.synopsis}</p>
      <p>{book.year}</p>
      <p>{book["ISBN"]}</p>
      <p>{book.author.name}</p>
      
      <div>
      Other books written by {book.author.name}:
      <ul>
        {book.author.otherBooks.map((book: string, idx: number) => (
          <li key={`related-book-${idx}`}>
            {book}
          </li>
        ))}
      </ul>
      </div>
    </article>
  )
}
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>BookShelf</h1>
      <Link href="/books">Lista de libros</Link>
    </div>
  );
}

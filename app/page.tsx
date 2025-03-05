import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Tu librería personal</h1>
      <Link href="/books">Quiero leer</Link>
    </div>
  );
}

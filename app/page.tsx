import Link from "next/link";
import { Logo } from "./ui/components/Logo";

export default function Home() {
  return (
    <div className="max-w-[1024px] mx-auto md:p-8 p-4 min-h-[calc(100vh-145px)] flex flex-col justify-center items-center">
      <div className="w-40 h-32 mb-8">
        <Logo />
      </div>
      <Link
        href="/books"
        className="font-sans font-semibold text-(--chalk) px-4 py-2 hover:bg-violet-500 transition-all rounded-sm bg-violet-700 md:text-lg"
      >
        ¡Quiero leer!
      </Link>
    </div>
  );
}

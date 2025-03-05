import Image from "next/image";

export const Footer = () => (
  <footer className="flex justify-center gap-x-2 font-sans bg-violet-100 text-violet-500 py-4">
    Hecho con
    <Image src={"/images/love-icon.svg"} width={20} height={20} alt="love" />x
    Ariel Moguillansky
  </footer>
);

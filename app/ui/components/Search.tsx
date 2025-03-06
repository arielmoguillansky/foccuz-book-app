"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Search: React.FC = () => {
  // La nueva versión de NextJs ya viene con un hook - solo lado cliente - que permite leer las queries de búsqueda
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  // optimiza el rendimiento al retrasar la ejecución de una función hasta que haya transcurrido un cierto tiempo de inactividad
  const handleSearch = useDebouncedCallback((searchString: string) => {
    // Se crea un nuevo objeto URLSearchParams que permite leer y modificar las queries de búsqueda
    const params = new URLSearchParams(searchParams);
    if (searchString) {
      // Si hay un string de búsqueda, se agrega al query
      params.set("search", searchString);
    } else {
      // Si no, se elimina el query
      params.delete("search");
    }
    // Se reemplaza la URL actual con la nueva URL que incluye el query de búsqueda SIN necesidad de recargar la página.
    replace(`${pathName}?${params.toString()}`);
  });
  return (
    <div className="flex flex-col grow">
      <label htmlFor="search" className="md:text-xl text-md">
        ¿Estás buscando a algún autor?
      </label>
      <input
        className="border border-violet-400 focus:border-violet-500 focus:shadow-[2px_1px_8px_0px_rgb(142_81_255/48%)] outline-0 rounded-sm p-2"
        type="text"
        placeholder="Autor..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </div>
  );
}
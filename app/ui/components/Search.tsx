"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const Search: React.FC = () => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const {replace} = useRouter()
  const handleSearch = useDebouncedCallback((searchString: string) => {
    const params = new URLSearchParams(searchParams)
    if (searchString) {
      params.set('search', searchString)
    } else {
      params.delete('search')
    }
    replace(`${pathName}?${params.toString()}`)
  });
  return (
    <div className="flex flex-col grow">
      <label htmlFor="search" className="md:text-xl text-md">
        ¿Estás buscando algo en particular?
      </label>
      <input
      className="border border-violet-400 focus:border-violet-500 focus:shadow-[2px_1px_8px_0px_rgb(142_81_255/48%)] outline-0 rounded-sm p-2"
        type="text"
        placeholder="Título..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  );
}
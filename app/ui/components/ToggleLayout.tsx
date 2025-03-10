"use client"

import { useContext } from "react";
import { ThemeContext } from "./BookList";
import { GridIcon } from "@/app/ui/components/common/icons/GridIcon";
import { ListIcon } from "@/app/ui/components/common/icons/ListIcon";

export const ToggleLayout: React.FC = () => {
  const { layout, setLayout } = useContext(ThemeContext);

  const handleLayoutChange = () => {
    setLayout(layout === "grid" ? "list" : "grid");
  };

  return (
    <div className="flex w-fit items-end">
    <button
      onClick={handleLayoutChange}
      className={`cursor-pointer p-2 ${layout === "grid" ? "bg-violet-500" : ""}`}
    >
      <GridIcon color={layout === "grid" ? '#ffff' : '#8e51ff'} />
    </button>
    <button
      onClick={handleLayoutChange}
      className={`cursor-pointer p-2 ${layout === "list" ? "bg-violet-500" : ""}`}
    >
      <ListIcon color={layout === "list" ? '#ffff' : '#8e51ff'} />
    </button>
  </div>
  );
}
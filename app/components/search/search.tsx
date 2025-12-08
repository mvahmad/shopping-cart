"use client";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Search({ onSearch }: { onSearch: (val: string) => void }) {
  const [value, setValue] = useState("");

  // Debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value);
    }, 300);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full max-w-md ">
      <Input
        placeholder="جستجو..."
        type="search"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        variant="bordered"
        className="block rounded-md  py-1.5 
        text-slate-900 placeholder:text-slate-400 
        focus:ring-2 focus:ring-inset focus:ring-indigo-600 
        sm:text-sm sm:leading-6"
      />
    </div>
  );
}


import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { LuPlus } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";

export default function NoteLeftHeader() {
  const [query, setQuery] = useState("");

  return (
    <header className="medium:py-3 border-b border-stone-300 px-4 pt-2 pb-4 dark:border-slate-700">
      <h1 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
        My Note
      </h1>

      <form action="" className="relative mb-4">
        <Input
          type="text"
          name="query"
          placeholder="Search note..."
          classname={
            "w-full pr-1 pl-6 bg-transparent dark:border-slate-700 dark:placeholder:text-slate-400 dark:text-white"
          }
        />
        <LuSearch className="absolute top-2.5 left-1.5 text-sm text-slate-600 dark:text-slate-300" />
      </form>

      <Button>
        <LuPlus /> New Note
      </Button>
    </header>
  );
}

import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { LuPlus } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";

export default function NoteLeftHeader() {
  const [query, setQuery] = useState("");

  return (
    <header className="medium:py-3 border-b border-stone-300 px-4 dark:border-slate-700">
      <HeaderText classname={"mb-2"}>My Note</HeaderText>

      <form action="" className="relative mb-2">
        <Input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search note..."
          classname={
            "w-full pr-1 pl-6 bg-transparent dark:border-slate-700 dark:placeholder:text-slate-400 dark:text-white"
          }
        />
        <LuSearch className="absolute top-2.5 left-2 text-sm text-slate-600 dark:text-slate-300" />
      </form>

      <Button>
        <LuPlus /> New Note
      </Button>
    </header>
  );
}

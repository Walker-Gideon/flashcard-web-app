import { useState } from "react";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { LuPlus } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import { useNote } from "../../../context/NoteContext";
import useLazyLoading from "../../../ui/LazyLoading";

export default function NoteLeftHeader() {
  const { setCreateNote, createNote } = useNote();
  const [query, setQuery] = useState("");

  const lazyTaggle = useLazyLoading(setCreateNote, 1000);

  function handleCreateNote() {
    lazyTaggle(true);
  }

  return (
    <header className="medium:py-3 border-b border-stone-300 px-4 py-5 dark:border-slate-700">
      <HeaderText classname={"mb-2 medium:block hidden"}>My Note</HeaderText>

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

      <Button
        variant="primary"
        classname={
          "flex items-center gap-2 w-full justify-center py-2 border-0"
        }
        color={
          "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        }
        disabled={createNote}
        onClick={handleCreateNote}
      >
        <LuPlus className="text-base" /> New Note
      </Button>
    </header>
  );
}

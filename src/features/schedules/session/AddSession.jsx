import Overlay from "../../../ui/Overlay";
import SessionHeader from "./SessionHeader";
import SessionForm from "./SessionForm";
import { useState } from "react";

export default function AddSession() {
  const [error, setError] = useState("");

  return (
    <Overlay model={true} type={"model"}>
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        <SessionHeader setError={setError} />
        <SessionForm setError={setError} error={error} />
      </div>
    </Overlay>
  );
}

import { useLoader } from "../context/LoaderContext";
import { LuLoader } from "react-icons/lu";

export default function Loader({ spin, loadingSpin }) {
  const { loading, spinner } = useLoader();

  if (loadingSpin)
    return (
      <div className="absolute inset-0 z-50 flex h-screen items-center justify-center">
        <LuLoader className="for spinning medium:h-8 medium:w-8 h-6 w-6 animate-spin dark:text-white" />
      </div>
    );

  return (
    <>
      {spin
        ? spinner && <div className="spinner w-5 bg-black p-1 text-black" />
        : loading && (
            <div className="progress bg-slate-900 dark:bg-slate-600" />
          )}
    </>
  );
}

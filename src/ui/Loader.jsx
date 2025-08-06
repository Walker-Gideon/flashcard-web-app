import { useLoader } from "../context/LoaderContext";

//  <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">

export default function Loader({ spin }) {
  const { loading, spinner } = useLoader();

  //  <div className="mb-4 rounded-full border border-gray-400 bg-white p-2 shadow-lg shadow-gray-500">
  // I did this to the add picture section if i will reuse it then go and fix that

  return (
    <>
      {spin
        ? spinner && <div className="spinner w-5 bg-black p-1 text-black" />
        : loading && (
            <div className="progress bg-slate-500 text-slate-500 dark:bg-slate-600 dark:text-slate-600" />
          )}
    </>
  );
}

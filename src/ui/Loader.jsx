import { useLoader } from "../context/LoaderContext";

//  <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">

export default function Loader({ spin }) {
  const { loading, spinner } = useLoader();

  return (
    <>
      {spin
        ? spinner && (
            <div className="spinner medium:w-8 medium:p-2 w-7 bg-black p-1.5 text-black" />
          )
        : loading && <div className="progress bg-black text-black" />}
    </>
  );
}

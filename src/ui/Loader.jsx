import { useLoader } from "../context/LoaderContext";

//  <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">

export default function Loader() {
  const { loading, spinner } = useLoader();

  if (spinner) return <div className="progress bg-black text-black" />;

  return (
    <div>{loading && <div className="progress bg-black text-black" />}</div>
  );
}

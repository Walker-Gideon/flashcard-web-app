import { useLoader } from "../context/LoaderContext";

export default function Loader() {
  const { loading } = useLoader();

  return (
    <div>{loading && <div className="progress bg-black text-black" />}</div>
  );
}

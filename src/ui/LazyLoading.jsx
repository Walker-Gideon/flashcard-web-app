import { useLoader } from "../context/LoaderContext";

export default function useLazyLoading(setShow, delay = 500) {
  const { setLoading } = useLoader();

  function lazyLoading(value) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow((prev) => (typeof value === "boolean" ? value : !prev));
    }, delay);
  }

  return lazyLoading;
}

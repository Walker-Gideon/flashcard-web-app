import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";

export default function LoaderAction(delay = 500) {
  const navigate = useNavigate();
  const { setLoading } = useLoader();

  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, delay);
  };

  return startLoadingAndNavigate;
}

import { LuX } from "react-icons/lu";
import Button from "../../ui/Button";
import { useLoader } from "../../context/LoaderContext";
import { useNavigate } from "react-router-dom";

export default function AuthClose() {
  const { setLoading } = useLoader();

  const navigate = useNavigate();
  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 500);
  };

  return (
    <div className="absolute top-2 right-2">
      <Button variant="outline" onClick={() => startLoadingAndNavigate("/")}>
        <LuX className="text-2xl font-bold" />
      </Button>
    </div>
  );
}

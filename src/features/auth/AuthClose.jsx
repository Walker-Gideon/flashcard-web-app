import { LuX } from "react-icons/lu";
import Button from "../../ui/Button";

export default function AuthClose() {
  return (
    <div className="absolute top-2 right-2">
      <Button variant="outline">
        <LuX className="text-2xl font-bold" />
      </Button>
    </div>
  );
}

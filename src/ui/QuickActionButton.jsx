import Button from "./Button";

export default function QuickActionButton({ onClick, icon, text, styling }) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      classname={`w-full button flex items-center border-0 space-x-3 p-3 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300 ${styling ? `${styling}` : ``}`}
    >
      {icon}
      <span>{text}</span>
    </Button>
  );
}

export default function Overlay({ zIndex }) {
  return (
    <div
      //absolute flex items-center justify-center
      className={`fixed inset-0 bg-slate-200/20 backdrop-blur-sm ${zIndex}`}
    />
  );
}

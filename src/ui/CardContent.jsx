export default function CardContent({ children, classname }) {
  return (
    <div
      className={`${classname ? `${classname}` : `flex items-center justify-between`}`}
    >
      {children}
    </div>
  );
}

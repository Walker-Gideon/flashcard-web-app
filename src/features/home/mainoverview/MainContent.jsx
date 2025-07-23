import MainContentImage from "./MainContentImage";
import MainContentText from "./MainContentText";

export default function MainContent({
  index,
  icon,
  title,
  subtitle,
  points,
  image,
}) {
  return (
    <div className="px-2 py-4 md:px-6 md:py-0 lg:px-15">
      <div
        className={`flex flex-col-reverse gap-8 md:grid md:h-100 md:grid-cols-2 md:items-center lg:gap-20`}
      >
        <MainContentText
          index={index}
          icon={icon}
          title={title}
          subtitle={subtitle}
          points={points}
        />
        <MainContentImage image={image} index={index} />
      </div>
    </div>
  );
}

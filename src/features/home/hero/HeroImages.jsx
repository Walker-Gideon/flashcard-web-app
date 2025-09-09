import dashboardImage from "../../../assets/dashboard.png";
import inspireImage from "../../../assets/inspire.png";
import chatImage from "../../../assets/chat&note.png";

const images = [
    {
        text: "description of the image",
        url: dashboardImage,
    },
    {
        text: "description of the image",
        url: inspireImage,
    },
    {
        text: "description of the image",
        url: chatImage,
    },
];

export default function HeroImages() {
    return (
        <div className="bg-red-500 w-full h-100 mt-8 px-4">
          {images.map((image, index) => ( 
            <div key={index} class="">
              <p>{image.text}</p>
              <div className="border border-slate-600 rounded-2xl w-50 h-60">
                <img src={image.url} alt={image.text} className="object-scale-down shadow-md shadow-slate-600" />
              </div>
            </div>
          ))}
        </div>
    );
}

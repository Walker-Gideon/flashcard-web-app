import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonailConStructure from "./TestimonailConStructure";

const testimonial = [
  {
    text: "I actually look forward to studying now. This changed the game for me.",
    name: "Ama B",
    place: "UG",
  },
  {
    text: "WalkWise helped me stay consistent without stress. The flashcards are brilliant.",
    name: "Kwame T",
    place: "CS Student",
  },
  {
    text: "When I get stuck, the AI gives me help instantly. No need to wait for a tutor.",
    name: " Sarah E",
    place: "KNUST Student",
  },
];

export default function TestimonialContent() {
  return (
    <div className="mx-auto max-w-xl px-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000 }}
        loop={true}
        pagination={{ clickable: true }}
        spaceBetween={50}
        slidesPerView={1}
      >
        {testimonial.map((data, index) => (
          <SwiperSlide key={index}>
            <TestimonailConStructure
              text={data.text}
              name={data.name}
              place={data.place}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

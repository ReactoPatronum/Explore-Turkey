import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { builder } from "@/utils/sanityClient";
import { useState } from "react";
import ZoomImage from "./Modals/ZoomImage";

export default function Slideshow({ images }) {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState("");

  return (
    <div className="mb-3 relative w-full px-5">
      <Carousel dynamicHeight showThumbs={false}>
        {images?.map((item) => (
          <div
            className="cursor-pointer"
            onClick={() => {
              setPicked(builder.image(item.image.asset._ref).url());
              setOpen(true);
            }}
            key={item._key}
          >
            <Image
              className="object-cover"
              loading="lazy"
              width={1000}
              height={1000}
              src={builder.image(item.image.asset._ref).url()}
              alt={item.title}
            />
            <p className="legend">{item.title}</p>
          </div>
        ))}
      </Carousel>
      <ZoomImage open={open} setOpen={setOpen} image={picked} />
    </div>
  );
}

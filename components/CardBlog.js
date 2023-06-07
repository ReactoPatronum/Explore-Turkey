import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { CardActionArea, Chip, Divider } from "@mui/material";
import { builder } from "@/utils/sanityClient";
import Convert from "@/utils/convertTime";

export default function ActionAreaCard({ item }) {
  return (
    <div className="" sx={{ maxWidth: 1000 }}>
      <CardActionArea>
        <CardMedia
          className="rounded-lg h-80 object-cover relative hover:scale-[1.02] transition-all duration-300"
          component="img"
          height="120"
          image={builder.image(item.mainImage).url()}
          alt={item.imageAlt}
        />
        <Chip
          className="absolute top-3 tracking-wider font-semibold right-3 bg-yellow-500 text-black hover:bg-black hover:text-white transition-all duration-200"
          label={
            item?.categories[0].title === "City"
              ? "City"
              : item?.categories[0].title === "Places"
              ? "Place"
              : "Food"
          }
        />
        <CardContent>
          <h1 className="text-center font-semibold text-xl my-2 md:text-3xl">
            {item.title}
          </h1>
          <div className="flex items-center justify-center my-2">
            <CalendarMonthIcon className="text-blue-500" />
            <span className="text-sm ml-2">{Convert(item._createdAt)}</span>
          </div>
          <h2 className="text-center text-gray-500 text-sm">
            {item?.description?.slice(0, 200)}...
          </h2>
        </CardContent>

        <div className="flex items-center justify-center">
          <div className="border-2 border-black py-2 px-7 rounded-full hover:bg-black hover:text-white transition-all duration-200 max-w-fit">
            Read More
          </div>
        </div>
      </CardActionArea>
      <Divider className="my-2" sx={{ borderBottomWidth: 3 }} />
    </div>
  );
}

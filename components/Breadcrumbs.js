import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Convert from "@/utils/convertTime";

export default function IconBreadcrumbs({ date, definition }) {
  return (
    <div className="mt-5 mx-5" role="presentation ">
      <div className="sm:flex items-center justify-between">
        <div
          className="flex items-center justify-start space-x-2"
          aria-label="breadcrumb"
        >
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="blue"
            href="/"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Mainpage
          </Link>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <div className="flex items-center">
            <PostAddIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Post
          </div>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            color="text.primary"
          >
            {definition?.startsWith("Food") ? (
              <RestaurantIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            ) : (
              <PublicIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            )}
            {definition}
          </Typography>
        </div>
        <div className="flex items-center  my-2">
          <CalendarMonthIcon className="text-blue-500" />
          <span className="text-sm ml-2">{Convert(date)}</span>
        </div>
      </div>
      <div className="mt-5 bg-[#FFEFD5] max-w-fit p-3 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-500 ml-4 tracking-widest">
          THE CONTENT OF THE BLOG
        </h3>
        <div className="mt-3 flex  flex-wrap">
          {}
          <a href="#content" className=" hover:underline mx-4">
            1-Article
          </a>
          <a href="#images" className=" hover:underline mx-4">
            2-Images
          </a>
          <a href="#comments" className=" hover:underline mx-4">
            3-Comments
          </a>
          {definition == "Food" ? null : (
            <a href="#activities" className=" hover:underline mx-4">
              4-Activities
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

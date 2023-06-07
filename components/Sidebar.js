/* eslint-disable @next/next/no-img-element */
import { Divider, Tooltip } from "@mui/material";
import React from "react";
import Newsletter from "./Modals/Newsletter";
import Image from "next/image";
import { builder } from "@/utils/sanityClient";
import Convert from "@/utils/convertTime";
import Link from "next/link";

function Sidebar({ item }) {
  const handleClick = () => {
    const email = "contactexploreturkey@gmail.com";

    window.location.href = `mailto:${email}`;
  };
  return (
    <div className="p-4 h-full">
      <div className="mt-2 sticky top-2 right-0">
        <h2 className="text-2xl font-semibold text-center my-4">
          You May Like It
        </h2>
        <Divider className="mb-5 border-yellow-400 border-2" />
        <div className="space-y-10">
          {item?.map((data) => (
            <Link
              className="flex space-x-3 hover:scale-[1.02] transition-all duration-300"
              key={data.slug.current}
              href={`/post/${data.slug.current}`}
            >
              <img
                className="w-36 h-28 object-cover rounded-lg cursor-pointer"
                src={builder.image(data.mainImage).url()}
                alt={data.imageAlt}
              />
              <div className="cursor-pointer hover:underline">
                <h3 className="text-gray-500 text-sm">
                  {Convert(data._createdAt)}
                </h3>
                <h3 className="text-[15px]">
                  {data?.title?.length > 30
                    ? `${data?.title?.slice(0, 30)}...`
                    : data?.title}
                </h3>
              </div>
            </Link>
          ))}
          <div className="mt-10" id="newslatter">
            <h2 className="text-2xl font-semibold text-center my-4">LINKS</h2>
            <Divider className="mb-5 border-yellow-400 border-2" />
            <div>
              <div className="flex items-center justify-center space-x-4 rounded-full mt-2">
                <Tooltip title="Upwork" placement="top">
                  <a href="http://localhost:3000/">
                    <Image
                      height={60}
                      width={60}
                      src="/../public/upworklogo.png"
                      alt="fiverr_Logo"
                    />
                  </a>
                </Tooltip>
                <Tooltip title="İnstagram" placement="top">
                  <a href="http://localhost:3000/">
                    <Image
                      height={60}
                      width={60}
                      src="/../public/instalogo.png"
                      alt="instagram_Logo"
                    />
                  </a>
                </Tooltip>
                <Tooltip
                  onClick={handleClick}
                  title="Get Contact"
                  placement="top"
                  className="cursor-pointer"
                >
                  <Image
                    height={60}
                    width={60}
                    src="/../public/email.png"
                    alt="email_Logo"
                  />
                </Tooltip>
              </div>
            </div>
            <div className="mt-4">
              <Newsletter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

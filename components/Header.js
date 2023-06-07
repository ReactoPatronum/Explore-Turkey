/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Divider, Tooltip } from "@mui/material";
import SearchModal from "../components/Modals/SearchModal";
import Link from "next/link";
import Drawer from "../components/Drawer";
import logo from "../public/applogo.png";

function Header() {
  const pages = [
    { text: "HOME", route: "/" },
    { text: "ABOUT", route: "/about" },
    { text: "BLOGS", route: "/blogs" },
  ];
  const handleClick = () => {
    const email = "contactexploreturkey@gmail.com";

    window.location.href = `mailto:${email}`;
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <Drawer />
        </div>
        <Link href="/">
          <Image className="cursor-pointer w-60" src={logo} alt="app_logo" />
        </Link>
        <ul className="hidden md:flex items-center space-x-4 text-xl font-semibold ml-3">
          {pages.map((page) => (
            <Link key={page.text} href={page.route}>
              <div className="hover:text-yellow-500 transition-all duration-200 cursor-pointer">
                {page.text}
              </div>
            </Link>
          ))}
        </ul>
        <div className="flex items-center">
          <SearchModal />
          <div className="md:flex items-center space-x-3 bg-gray-200 p-2 px-4 rounded-full hidden">
            <Tooltip title="Upwork" placement="top">
              <a href="http://localhost:3000/">
                <Image
                  height={30}
                  width={30}
                  src="/upworklogo.png"
                  alt="fiverr_Logo"
                />
              </a>
            </Tooltip>
            <Tooltip title="İnstagram" placement="top">
              <a href="http://localhost:3000/">
                <Image
                  height={30}
                  width={30}
                  src="/instalogo.png"
                  alt="fiverr_Logo"
                />
              </a>
            </Tooltip>
            <Tooltip
              onClick={handleClick}
              title="Get Contact"
              placement="top"
              className="cursor-pointer"
            >
              <Image height={30} width={30} src="/email.png" alt="email_Logo" />
            </Tooltip>
          </div>
        </div>
      </div>
      <Divider className="mt-5 border-[1px]" />
    </div>
  );
}

export default Header;

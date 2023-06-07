import { Tooltip } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../public/applogo.png";

function Footer() {
  return (
    <div className="h-32 bg-[#1C1D1E]">
      <div className="text-white flex items-center justify-between h-full max-w-[1200px] mx-auto px-8">
        <div>
          <Link href="/">
            <Image className="cursor-pointer w-60" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="hidden sm:block text-sm">
          <h5>All rights reserved. ©2023 exploreturkey-blog.</h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;

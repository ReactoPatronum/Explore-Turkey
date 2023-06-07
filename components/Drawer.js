import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import BookIcon from "@mui/icons-material/Book";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/applogo.png";
import Newsletter from "./Modals/Newsletter";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });
  const pages = [
    { text: "HOME", icon: <HomeIcon />, route: "/" },
    { text: "ABOUT", icon: <HelpIcon />, route: "/about" },
    { text: "BLOGS", icon: <BookIcon />, route: "/blogs" },
  ];

  const handleClick = () => {
    const email = "contactexploreturkey@gmail.com";

    window.location.href = `mailto:${email}`;
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      className="relative h-screen"
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="flex items-center justify-between mt-3 px-3">
        <Image className="cursor-pointer w-44" src={logo} alt="app_logo" />
        <HighlightOffIcon
          onClick={toggleDrawer(anchor, false)}
          className="cursor-pointer text-3xl"
        />
      </div>
      <List>
        {pages.map((page) => (
          <Link
            onClick={toggleDrawer(anchor, false)}
            href={page.route}
            key={page.text}
          >
            <div className="hover:text-yellow-500 font-semibold transition-all duration-200 mt-2">
              <ListItemButton className="p-3">
                <ListItemIcon>{page.icon}</ListItemIcon>
                <div className="cursor-pointer">{page.text}</div>
              </ListItemButton>
            </div>
          </Link>
        ))}
      </List>
      <Divider />
      <List className="">
        <a target="_blank" href="">
          <div className="hover:text-green-500 font-semibold transition-all duration-200 ">
            <ListItemButton>
              <ListItemIcon>
                <Image
                  height={30}
                  width={30}
                  src="/../public/upworklogo.png"
                  alt="fiverr_Logo"
                />
              </ListItemIcon>
              <div className="cursor-pointer">Upwork</div>
            </ListItemButton>
          </div>
        </a>
        <a target="_blank" href="">
          <div className="hover:text-orange-600 font-semibold transition-all duration-200 ">
            <ListItemButton>
              <ListItemIcon>
                <Image
                  height={30}
                  width={30}
                  src="/../public/instalogo.png"
                  alt="fiverr_Logo"
                />
              </ListItemIcon>
              <div className="cursor-pointer">Instagram</div>
            </ListItemButton>
          </div>
        </a>

        <div
          onClick={handleClick}
          className="hover:text-blue-600 font-semibold transition-all duration-200 "
        >
          <ListItemButton>
            <ListItemIcon>
              <Image
                height={30}
                width={30}
                src="/../public/email.png"
                alt="email_Logo"
              />
            </ListItemIcon>
            <div className="cursor-pointer">Get Contact</div>
          </ListItemButton>
        </div>

        {/* <a target="_blank" href="">
          <div className="hover:text-blue-600 font-semibold transition-all duration-200 ">
            <ListItemButton>
              <ListItemIcon>
                <Image
                  height={30}
                  width={30}
                  src="/../public/store.png"
                  alt="fiverr_Logo"
                />
              </ListItemIcon>
              <div className="cursor-pointer">Shop</div>
            </ListItemButton>
          </div>
        </a> */}
      </List>
      <div className="absolute bottom-0 right-0 w-full p-5">
        <Newsletter />
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuRoundedIcon fontSize="large" className="text-black" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

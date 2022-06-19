// https://mega.nz/folder/P9JDWJKY#nt80vpSaoOk7mOy1tqzB1A/folder/e8xUEAbS
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import images from "../assets";
import { Button } from "../components";

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/created-nfts";
      case 2:
        return "/my-nfts";
      default:
        break;
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 ${
            active == item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          } `}
          key={i}
          onClick={() => setActive(item)}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;

  return hasConnected ? (
    <Button
      handleClick={() => {
        setActive("");
        return router.push("/create-nft");
      }}
      btnName="Create"
      classStyle={`mx-2 rounded-xl`}
    />
  ) : (
    <Button
      handleClick={() => {}}
      btnName="Connect"
      classStyle={`mx-2 rounded-xl`}
    />
  );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const [active, setActive] = useState("Explore NFTs");

  const [open, setopen] = useState(false);

  console.log("theme", theme);

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      {/* logo and title */}

      <div className="flex flex-1 flex-row justify-start">
        <Link href={"/"}>
          <div
            className="flexCenter md:hidden cursor-pointer"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              objectFit="contain"
              width={"32"}
              height={"32"}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1  font-semibold text-lg ml-1 ">
              CryptoKet
            </p>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit="contain"
              width={"32"}
              height={"32"}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      {/* dark mode  */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-1">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label"
            id="checkbox"
            onChange={() => {}}
          >
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="w-3 h-3 absolute bg-white rounded rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2 ">
        {open ? (
          <Image
            src={images.cross}
            alt="img"
            objectFit="contain"
            width={20}
            height={20}
            onClick={() => setopen(false)}
            className={theme == "light" && "filter invert"}
          />
        ) : (
          <Image
            src={images.menu}
            alt="ig"
            objectFit="contain"
            width={25}
            height={25}
            onClick={() => setopen(true)}
            className={theme == "light" && "filter invert"}
          />
        )}

        {open && (
          <div className="fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10 nav-h flex justify-between flex-col ">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

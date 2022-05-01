import { account_image, logo_src, menuOptions } from "../utils/header";
import { BellIcon, SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${isScrolled && "bg-dark"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo_src}
          alt="netflix logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          {menuOptions.map((option, index) => (
            <li
              className="cursor-pointer text-sm font-light capitalize text-[#e5e5e5] transition duration-500 hover:text-[#b3b3b3]"
              key={index}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href={"/account"} passHref>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={account_image}
            alt="account"
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;

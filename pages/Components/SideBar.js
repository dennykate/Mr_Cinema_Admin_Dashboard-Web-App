import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const SideBar = ({ pathname }) => {
  const [hide, setHide] = useState(false);

  return (
    <div
      className={`${
        hide ? "w-20" : "sm:w-44 w-0"
      }  duration-200 min-h-screen bg-white shadow-lg fixed top-0 sm:sticky z-50`}
    >
      <div
        id="logo-container"
        className="py-6 w-full h-24 flex justify-center items-center bg-[#4F46E5] 
        text-white cursor-pointer relative transition-none"
      >
        <div
          className={`flex items-center justify-cente pr-1 text-[#4F46E5] 
          ${
            hide ? "bg-transparent rounded-full" : "sm:bg-white rounded-full"
          } `}
        >
          <Image
            src={require("../../public/images/logo.png")}
            alt="Logo"
            width={50}
            height={50}
          />
          <div
            className={`text-sm font-monos font-extrabold ${
              hide ? "hidden opacity-0" : "vidible opacity-100"
            }`}
          >
            MR PUSSY
          </div>
        </div>

        <div
          id="toggle-button"
          className="w-8 h-8 bg-[#4F46E5] absolute right-0 translate-x-8 rounded-r-full flex justify-center
          items-center pr-1"
          onClick={() => {
            setHide(!hide);
          }}
        >
          <Image
            src={require(`../../public/images/menu-bar.png`)}
            alt="left-arrow-icon"
            width={25}
            height={20}
            className=""
          />
        </div>
      </div>

      <div
        id-="upload-container"
        className="w-full flex justify-center flex-col items-center border-b border-gray-300 overflow-hidden"
      >
        <div className="text-[#4F46E5] font-bold text-md my-3 ">Upload</div>

        <MovieItem hide={hide} pathname={pathname} />

        <OtherItem
          hide={hide}
          image={"category-icon.png"}
          name={"Category"}
          slug={"category"}
          pathname={pathname}
        />

        <OtherItem
          hide={hide}
          image={"actress-icon.png"}
          name={"Actress"}
          slug={"actress"}
          pathname={pathname}
        />

        <OtherItem
          hide={hide}
          image={"money-icon.png"}
          name={"Ads"}
          slug={"ads"}
          pathname={pathname}
        />

        <OtherItem
          hide={hide}
          image={"social-icon.png"}
          name={"Social"}
          slug={"social"}
          pathname={pathname}
        />
      </div>

      <Link href={"./auth-code"}>
        <div
          id="authcode-verify"
          className={`w-full h-12 flex justify-center items-center text-sm font-mono cursor-pointer
          hover:bg-gray-300 group hover:text-[#4F46E5] mt-4 overflow-hidden
          ${pathname == "auth-code" ? "border-r-4 border-[#4F46E5]" : ""}
          `}
        >
          <div
            className={`flex ${
              hide ? "w-full justify-center" : "w-2/5 justify-end"
            }`}
          >
            <div id="icon-container" className="w-5 mr-2 ">
              <Image
                src={require("../../public/images/authcode-icon.png")}
                alt="movie icon"
                width={1718}
                height={2316}
              />
            </div>
          </div>
          <div
            className={`w-3/5 group-hover:font-bold ${
              hide ? "hidden" : "visible"
            }`}
          >
            Auth Code
          </div>
        </div>
      </Link>
    </div>
  );
};

const MovieItem = ({ hide, pathname }) => {
  return (
    <Link href={"./movie"}>
      <div
        id="movie-upload"
        className={`w-full h-12 flex justify-center items-center text-sm font-mono cursor-pointer
          hover:bg-gray-300 group hover:text-[#4F46E5] 
          ${pathname == "movie" ? "border-r-4 border-[#4F46E5]" : ""}
          `}
      >
        <div
          className={`flex ${
            hide ? "w-full justify-center" : "w-2/5 justify-end"
          }`}
        >
          <div id="icon-container" className="sm:w-7 w-6 mr-2 ">
            <Image
              src={require("../../public/images/movie-icon.png")}
              alt="movie icon"
              width={917}
              height={1000}
            />
          </div>
        </div>
        <div
          className={`w-3/5 group-hover:font-bold ${
            hide ? "hidden" : "visible"
          }`}
        >
          Movie
        </div>
      </div>
    </Link>
  );
};

const OtherItem = ({ hide, image, name, slug, pathname }) => {
  return (
    <Link href={`./${slug}`}>
      <div
        className={`w-full h-12 flex justify-center items-center text-sm font-mono cursor-pointer
          hover:bg-gray-300 group hover:text-[#4F46E5]
        ${pathname == slug ? "border-r-4 border-[#4F46E5]" : ""}
          `}
      >
        <div
          className={`flex ${
            hide ? "w-full justify-center" : "w-2/5 justify-end"
          } `}
        >
          <div id="icon-container" className="sm:w-6 w-5 mr-2 ">
            <Image
              src={require("../../public/images/" + image)}
              alt="movie icon"
              width={750}
              height={750}
            />
          </div>
        </div>
        <div
          className={`w-3/5 group-hover:font-bold  ${
            hide ? "hidden" : "visible"
          }`}
        >
          {name}
        </div>
      </div>
    </Link>
  );
};

export default SideBar;

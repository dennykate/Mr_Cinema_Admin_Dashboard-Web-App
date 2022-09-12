import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const EditAdsCard = ({ gif, show, type, position, name, url }) => {
  const [editCardShow, setEditCardShow] = useState(false);

  useEffect(() => {
    setEditCardShow(show);
  }, [show]);

  return (
    <div
      className={`bg-black bg-opacity-50 fixed top-0 left-0 z-50 overflow-hidden
      ${
        editCardShow ? "w-full h-screen opacity-100" : "w-0 h-0 opacity-0"
      } transition-ease-in-out duration-100 overflow-hidden flex justify-center items-center py-5 
    `}
    >
      {/* Hide Card */}
      <div className="sm:w-3/4 w-11/12 h-auto bg-white rounded-md relative">
        <div
          className=" absolute top-5 right-5 w-8 h-8 bg-red-500 rounded-full cursor-pointer
          flex justify-center items-center text-black hover:bg-white hover:text-red-500 
          hover:border hover:border-red-500 z-50
        "
          onClick={() => {
            setEditCardShow(false);
          }}
        >
          <XMarkIcon className="w-6 " />
        </div>

        <div className="w-11/12 mx-auto py-8">
          <div
            className={`${
              type == "banner"
                ? "sm:w-3/4 sm:mt-0 mt-10 w-full"
                : "sm:w-1/4 w-1/2"
            } mx-auto `}
          >
            <Image
              src={gif}
              alt="ads"
              width={type == "banner" ? 1024 : 512}
              height={type == "banner" ? 180 : 512}
            />
          </div>

          <div className="text-lg font-semibold mt-4">{name}</div>
          <div className="text-sm mt-2">{position}</div>
          <input
            type="text"
            className="w-full h-10 bg-[#f5f5f5] mt-4 px-2 text-sm outline-[#4F46E5]"
            value={gif}
            placeholder="Gif"
          />
          <input
            type="text"
            className="w-full h-10 bg-[#f5f5f5] mt-4 px-2 text-sm outline-[#4F46E5]"
            value={url}
            placeholder="Url"
          />
          <div
            className="sm:w-32 w-full h-10 text-sm flex justify-center items-center bg-[#4F46E5]
           text-white font-semibold mt-10 cursor-pointer rounded-md"
          >
            Confirm Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdsCard;

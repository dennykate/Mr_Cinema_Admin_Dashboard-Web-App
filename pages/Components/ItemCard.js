import Image from "next/image";
import React from "react";

const ItemCard = () => {
  return (
    <div className="w-full h-32 flex border-b border-gray-300">
      <div className="w-52 h-32 overflow-hidden flex justify-center items-center">
        <Image
          src={"https://pics.dmm.co.jp/digital/video/ssis00348/ssis00348pl.jpg"}
          alt="thumbnail"
          width={1720}
          height={1080}
          className="object-cover"
        />
      </div>

      <div className="w-5/12 sm:flex hidden  h-32 px-4 py-2 items-center">
        <div>
          SSIS-348 <br />
          <div className="text-gray-600 text-xs mt-2">
            So Vulnerable When In Love". Lusted After Girlfriend's Sister And
            Fucked Her Secretly. I'm Just The Pits. Nanami Ogura
          </div>
        </div>
      </div>

      <div className="sm:w-4/12 w-6/12 h-32 flex flex-col justify-center items-center">
        <div className="sm:hidden visible text-xs">SSIS-248</div>
        <div
          className="sm:w-20 sm:h-8 w-12 h-6 flex justify-center items-center sm:text-sm text-xs sm:my-2 
          my-1 rounded-md bg-[#4F46E5] text-white cursor-pointer 
          hover:bg-white hover:text-[#4F46E5] hover:border-[#4F46E5] border"
        >
          Edit
        </div>
        <div
          className="sm:w-20 sm:h-8 w-12 h-6  flex justify-center items-center sm:text-sm text-xs sm:my-2 my-1 rounded-md 
         bg-red-600 text-white cursor-pointer 
         hover:bg-white hover:text-red-600 hover:border-red-600 border"
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

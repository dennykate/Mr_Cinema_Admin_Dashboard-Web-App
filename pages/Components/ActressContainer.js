import Image from "next/image";
import Link from "next/link";
import React from "react";
import ItemCard from "./ItemCard";

const ActressContainer = () => {
  return (
    <div className="w-full sm:pt-4 pt-2 sm:px-10 px-0 h-screen overflow-scroll hide-scrollbar pb-20">
      <Link href={"./add-actress"}>
        <div
          id="add-item-button"
          className="sm:w-36 w-28 sm:h-10 h-8 flex justify-center items-center bg-[#4F46E5] rounded-sm text-white font-mono
        sm:text-md text-xs cursor-pointer hover:bg-white hover:border 
        hover:border-[#4F46E5] hover:text-[#4F46E5] hover:font-bold sm:mx-0 mx-2"
        >
          Add New Actress
        </div>
      </Link>

      <div id="movie-card-container" className="w-full mt-8">
        <div id="next-prev-container" className="w-full h-8">
          <div className="sm:w-48 w-36 sm:h-9 h-8 float-right flex">
            <div
              className="w-1/5 h-full sm:p-2 p-1 cursor-pointer hover:bg-gray-300 rounded-sm
            flex justify-center items-center"
            >
              <Image
                src={require("../../public/images/prev-icon.png")}
                alt="Next Icon"
                width={18}
                height={18}
              />
            </div>
            <div
              className="w-1/5 h-full sm:p-2 p-1 cursor-pointer hover:bg-gray-300 rounded-sm
            flex justify-center items-center"
            >
              <Image
                src={require("../../public/images/next-icon.png")}
                alt="Next Icon"
                width={18}
                height={18}
              />
            </div>
            <input
              type="number"
              className="w-1/5 outline-[#4F46E5] border-2 border-gray-300 text-center text-black font-bold"
            />
            <div
              className="w-2/5 border-2 border-[#4F46E5] flex items-center justify-center
          sm:text-sm text-xs cursor-pointer font-extrabold hover:bg-[#4F46E5] hover:text-white"
            >
              Confirm
            </div>
          </div>
        </div>

        <div className="w-full border border-opacity-20 border-black  mt-5">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  );
};

export default ActressContainer;

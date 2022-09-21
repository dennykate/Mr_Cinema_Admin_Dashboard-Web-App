import Link from "next/link";
import React from "react";

export const BackButton = ({ back }) => {
  return (
    <Link href={back}>
      <div
        id="back-to-movie-page"
        className="absolute sm:top-5 sm:left-5 top-2 left-2  sm:w-14 sm:h-8 
          w-12 h-6  bg-[#4F46E5] rounded-sm 
        flex justify-center items-center
        cursor-pointer hover:bg-white hover:border-[#4F46E5] border text-white 
        hover:text-[#4F46E5] sm:text-sm text-xs"
      >
        Back
      </div>
    </Link>
  );
};

export const InputCard = ({ type, placeholder, setData, value }) => (
  <div className="w-full h-16 mb-6">
    <div className="ml-1 font-bold text-[#4F46E5]">{type}</div>
    <input
      value={value}
      type="text"
      className="w-full sm:h-12 h-10 bg-gray-300 px-3 outline-[#4F46E5]"
      placeholder={placeholder}
      onChange={(text) => {
        setData(text.target.value);
      }}
    />
  </div>
);

import React from "react";

const StatsiticView = () => {
  return (
    <div className="w-full ">
      <div className="w-10/12 mx-auto flex flex-row justify-between items-center flex-wrap pt-8">
        <StatsiticCard total={120} type={"VIDEOS"} />
        <StatsiticCard total={30} type={"CATEGORIES"} />
        <StatsiticCard total={82} type={"ACTRESSES"} />
        <StatsiticCard total={1413432151} type={"VIEWS"} />
      </div>
    </div>
  );
};

const StatsiticCard = ({ total, type }) => {
  return (
    <div
      id="statistic-card"
      className="w-96 h-40 sm:h-52 bg-white shadow-xl rounded-xl my-4 flex justify-center items-center"
    >
      <div className="flex items-baseline justify-center flex-wrap">
        <div className="text-[#4F46E5] font-sans font-extrabold text-3xl sm:text-5xl mr-2">
          {total}
        </div>
        <div className="text-black font-sans font-extrabold text-xl sm:text-3xl">
          {type}
        </div>
      </div>
    </div>
  );
};

export default StatsiticView;

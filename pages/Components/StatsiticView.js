import React, { useEffect, useState } from "react";

const StatsiticView = () => {
  const [totalvideo, setTotalvideo] = useState();
  const [totalcategory, setTotalcategory] = useState();
  const [totalactress, setTotalactress] = useState();

  useEffect(() => {
    fetchTotalVideo("movie", setTotalvideo);
    fetchTotalVideo("category", setTotalcategory);
    fetchTotalVideo("actress", setTotalactress);
  }, []);

  const fetchTotalVideo = (path, setData) => {
    fetch(`http://localhost:8000/${path}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.meta.total);
      });
  };

  return (
    <div className="w-full ">
      <div className="w-10/12 mx-auto flex flex-row justify-between items-center flex-wrap pt-8">
        <StatsiticCard total={totalvideo} type={"VIDEOS"} />
        <StatsiticCard total={totalcategory} type={"CATEGORIES"} />
        <StatsiticCard total={totalactress} type={"ACTRESSES"} />
        <StatsiticCard total={"---"} type={"VIEWS"} />
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

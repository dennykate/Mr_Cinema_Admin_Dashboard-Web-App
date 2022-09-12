import React, { useEffect, useState } from "react";
import Image from "next/image";
import { adsDetails } from "./Helper/HelperData";
import EditAdsCard from "./EditAdsCard";

const AdsContainer = () => {
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    fetchAdsData();
  }, []);

  const fetchAdsData = () => {
    fetch("http://localhost:8000/ads")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setAdsData(data.data);
      });
  };

  return (
    <div className="w-full h-screen overflow-scroll hide-scrollbar">
      <div
        id="ads-card-container"
        className="max-w-5xl h-auto mx-auto pt-7 flex justify-evenly flex-wrap items-center pb-32"
      >
        {adsData.length > 0 &&
          adsData.map((data, index) => {
            return (
              <AdsCard
                type={
                  index == 0 || index == 11 || index == 6 ? "native" : "banner"
                }
                gif={data.gif}
                url={data.url}
                key={index}
                name={adsDetails[index].type}
                position={adsDetails[index].position}
              />
            );
          })}
      </div>
    </div>
  );
};

const AdsCard = ({ type, gif, name, position, url }) => {
  const [showAds, setShowAds] = useState(false);
  return (
    <>
      <EditAdsCard
        gif={gif}
        show={showAds}
        type={type}
        position={position}
        name={name}
        url={url}
      />
      <div className="sm:w-60 w-10/12 h-48 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center mb-4">
        <div
          className={`h-32 flex justify-center items-center
        ${type == "banner" ? "sm:w-11/12 w-11/12" : "sm:w-1/2 w-2/5 "}
      `}
        >
          <Image
            src={gif}
            alt="Ads"
            width={type == "banner" ? 1024 : 512}
            height={type == "banner" ? 200 : 512}
          />
        </div>
        <div className="text-xs font-sans font-semibold">{name}</div>
        <div
          className="px-4 py-1 bg-[#4F46E5] text-white rounded-xs text-sm mt-2 cursor-pointer
           hover:text-[#4F46E5] hover:bg-white font-bold border border-[#4F46E5]"
          onClick={() => {
            setShowAds(!showAds);
          }}
        >
          Change
        </div>
      </div>
    </>
  );
};

export default AdsContainer;

import React, { useEffect, useState } from "react";
import Image from "next/image";

const SocialContainer = () => {
  const [socialsData, setSocialsData] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/socials")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data[0]);
        setSocialsData(data.data[0]);
      });
  }, []);

  return (
    <div className=" w-full h-screen overflow-scroll hide-scrollbar py-5 sm:py-10">
      <div className="max-w-3xl mx-auto ">
        {socialsData && (
          <>
            <SocialCard image={"facebook-icon.png"} url={socialsData.fb_page} />
            <SocialCard
              image={"messenger-icon.png"}
              url={socialsData.messenger}
            />
            <SocialCard
              image={"telegram-icon.png"}
              url={socialsData.telegram_channel}
            />
            <SocialCard image={"email-icon.png"} url={socialsData.email} />
            <SocialCard image={"viber-icon.png"} url={socialsData.viber} />
          </>
        )}
      </div>
    </div>
  );
};

const SocialCard = ({ image, url }) => {
  return (
    <div className="w-full h-20 flex bg-gray-300 rounded-lg mb-3">
      <div className="w-20 h-20 flex justify-center items-center">
        <div className="w-12 h-12">
          <Image
            src={require(`../../public/images/${image}`)}
            alt="facebook-icon"
            width={1024}
            height={1024}
          />
        </div>
      </div>
      <div className="sm:w-2/3 w-full flex justify-center items-center h-20 px-5">
        <input
          type="text"
          className="w-full sm:h-10 h-8 bg-white rounded-md px-2 border-none outline-none"
          v
          value={url}
        />
      </div>
      <div className="w-auto h-20 sm:px-5 px-0 flex justify-center items-center sm:mr-0 mr-2">
        <div
          className="sm:px-6 sm:py-2 px-3 py-1 bg-[#4F46E5] text-white sm:text-sm text-xs text-center
          sm:rounded-full rounded-md cursor-pointer
            border border-[#4F46E5] hover:text-[#4F46E5] hover:bg-white hover:font-bold"
          onClick={() => {
            confirm("are you sure to change");
          }}
        >
          Edit Confirm
        </div>
      </div>
    </div>
  );
};

export default SocialContainer;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Alert from "./Alert";

const SocialCard = ({ image, url, post, setData }) => {
  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  const toggleAlertShow = (text) => {
    setAlertShow(true);
    setText(text);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  return (
    <div className="w-full h-20 flex bg-gray-300 rounded-lg mb-3">
      <Alert
        show={alertShow}
        text={text}
        color={text == "Success" ? "bg-green-600" : "bg-red-600"}
      />

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
          value={url}
          onChange={(text) => {
            setData(text.target.value);
          }}
        />
      </div>
      <div className="w-auto h-20 sm:px-5 px-0 flex justify-center items-center sm:mr-0 mr-2">
        <div
          className="sm:px-6 sm:py-2 px-3 py-1 bg-[#4F46E5] text-white sm:text-sm text-xs text-center
            sm:rounded-full rounded-md cursor-pointer
              border border-[#4F46E5] hover:text-[#4F46E5] hover:bg-white hover:font-bold"
          onClick={() => {
            const text = "Are You Sure To Delete";
            if (confirm(text)) {
              post();
            } else {
              alert("Cancle");
            }
          }}
        >
          Edit Confirm
        </div>
      </div>
    </div>
  );
};

export default SocialCard;

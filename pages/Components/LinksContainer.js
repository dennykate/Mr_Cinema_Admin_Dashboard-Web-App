import React, { useState } from "react";
import {
  TrashIcon,
  ChevronDoubleUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { SeverIcon } from "./Helper/HelperData";
import Alert from "./Alert";

const LinksContainer = ({ setNumOfLinks, numOfLinks, setLinks, links }) => {
  const [sever, setSever] = useState();
  const [inplink, setInplink] = useState();
  const [size, setSize] = useState();
  const [quality, setQuality] = useState();

  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");
  const [added, setAdded] = useState(false);

  const addToMainLinks = () => {
    let data = { sever, image: SeverIcon[sever], link: inplink, size, quality };

    for (let i in data) {
      if (data[i] == undefined || data[i] == "") {
        toggleAlertShow();
        setText("Fail");
        return;
      }
    }

    setLinks([...links, data]);
    toggleAlertShow();
    setText("Success");
    setAdded(true);
  };

  const toggleAlertShow = () => {
    setAlertShow(true);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  return (
    <div className="w-full sm:h-14 h-8 sm:my-10 my-5 flex ">
      {alertShow && (
        <Alert
          show={alertShow}
          text={text}
          color={text == "Fail" ? "bg-red-600" : "bg-green-600"}
        />
      )}

      <select
        id="countries"
        className="bg-gray-50 w-1/6 border border-gray-300 text-gray-900 sm:text-sm text-xs focus:ring-blue-500
         focus:border-blue-500 block sm:p-2.5 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
         "
        onChange={(text) => {
          setSever(text.target.value);
        }}
        defaultValue={"Default"}
      >
        <option value="Default">Selete Sever</option>
        <option value="PussyDrive">PussyDrive</option>
        <option value="MegaNz">MegaNz</option>
        <option value="StreamSb">StreamSb</option>
        <option value="MegaUp">MegaUp</option>
      </select>

      <input
        type="text"
        className="w-3/6 sm:h-14 h-8 bg-gray-300 outline-[#4F46E5] px-2 border-r-2 border-[#4F46E5] 
          sm:text-sm text-xs"
        placeholder="link"
        onChange={(text) => {
          setInplink(text.target.value);
        }}
      />

      <input
        type="text"
        className="w-1/6 sm:h-14 h-8 bg-gray-300 outline-[#4F46E5] px-2 border-r-2 border-[#4F46E5]
          sm:text-sm text-xs"
        placeholder="size"
        onChange={(text) => {
          setSize(text.target.value);
        }}
      />

      <input
        type="text"
        className="w-1/6 sm:h-14 h-8 bg-gray-300 outline-[#4F46E5] px-2 border-r-2 border-[#4F46E5]
          sm:text-sm text-xs"
        placeholder="quality"
        onChange={(text) => {
          setQuality(text.target.value);
        }}
      />

      <div
        className={`sm:h-14 sm:w-12 h-8 w-8 flex justify-center items-center cursor-pointer
         border-r-2 border-[#4F46E5]  hover:text-white
         ${added ? "bg-green-600 text-white" : "bg-gray-300 hover:bg-red-600"}`}
        onClick={addToMainLinks}
      >
        <CheckIcon className="sm:w-5 w-4" />
      </div>

      <div
        className="sm:h-14 sm:w-12 h-8 w-8 flex justify-center items-center bg-gray-300 cursor-pointer
          border-r-2 border-[#4F46E5] hover:bg-red-600 hover:text-white"
        onClick={() => {
          setNumOfLinks(numOfLinks.splice(0, numOfLinks.length - 1));
        }}
      >
        <TrashIcon className="sm:w-5 w-4" />
      </div>
    </div>
  );
};

export default LinksContainer;

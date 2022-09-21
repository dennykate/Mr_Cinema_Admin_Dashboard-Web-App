import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Alert from "./Alert";

const ItemCard = ({ data, path, setRefreshCode, refreshCode }) => {
  const checkAdminAndDelete = () => {
    const authcode = localStorage.getItem("auth-code");
    fetch("http://localhost:8000/user/check-admin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authcode}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Success") {
          deleteToSever();
        } else {
          toggleAlertShow("Fail");
        }
      });
  };

  const deleteToSever = () => {
    const authcode = localStorage.getItem("auth-code");
    fetch(`http://localhost:8000/${path}/${data._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authcode}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message == "remove success") {
          toggleAlertShow("Success");
          setRefreshCode(!refreshCode);
        }
      });
  };

  const toggleAlertShow = (text) => {
    setAlertShow(true);
    setText(text);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="w-full h-32 flex border-b border-gray-300">
      <Alert
        show={alertShow}
        text={text}
        color={text == "Success" ? "bg-green-600" : "bg-red-600"}
      />

      <div className="w-52 h-32 overflow-hidden flex justify-center items-center">
        <Image
          src={data.image}
          alt="thumbnail"
          width={1720}
          height={1080}
          className="object-cover"
        />
      </div>

      <div className="w-5/12 sm:flex hidden  h-32 px-4 py-2 sm:ml-5 items-center">
        <div>
          {path == "movie" && (
            <div>
              <small>{data.id}.</small>
            </div>
          )}
          <div>{data.title} </div>
          {data.rate && (
            <div className="text-gray-600 text-sm mt-2">rate - {data.rate}</div>
          )}
          {data.content && (
            <div className="text-gray-600 text-xs mt-2">{data.content}</div>
          )}
        </div>
      </div>

      <div className="sm:w-4/12 w-6/12 h-32 flex flex-col justify-center items-center">
        <div className="sm:hidden visible text-xs">
          {path == "movie" && <small>{data.id}.</small>}
          <div className="w-12 truncate">{data.title}</div>
        </div>

        {
          <Link href={`./add-edit-${path}?slug=${data.slug}`}>
            <div
              className="sm:w-20 sm:h-8 w-12 h-6 flex justify-center items-center sm:text-sm text-xs sm:my-2 
          my-1 rounded-md bg-[#4F46E5] text-white cursor-pointer 
          hover:bg-white hover:text-[#4F46E5] hover:border-[#4F46E5] border"
            >
              Edit
            </div>
          </Link>
        }

        <div
          className="sm:w-20 sm:h-8 w-12 h-6  flex justify-center items-center sm:text-sm text-xs sm:my-2 my-1 rounded-md 
         bg-red-600 text-white cursor-pointer 
         hover:bg-white hover:text-red-600 hover:border-red-600 border"
          onClick={checkAdminAndDelete}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

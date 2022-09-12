import React, { useState } from "react";
import { HomeIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Alert from "./Alert";

const NavBar = () => {
  const [checkAuth, setCheckAuth] = useState();
  const [alertShow, setAlertShow] = useState(false);

  const checkAdmin = () => {
    const authcode = localStorage.getItem("auth-code");
    fetch("http://localhost:8000/user/check-admin", {
      method: "POST",
      headers: {
        authorization: `Bearer ${authcode}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setCheckAuth(data.message);

        toggleAlertShow();
      });
  };

  const toggleAlertShow = () => {
    setAlertShow(true);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  return (
    <div className="w-full h-24 bg-white shadow-md flex justify-end items-center">
      {checkAuth && (
        <Alert
          show={alertShow}
          text={checkAuth}
          color={checkAuth == "Fail" ? "bg-red-600" : "bg-green-600"}
        />
      )}

      <Cog6ToothIcon
        className="sm:h-8 h-6 sm:mr-10 mr-5 cursor-pointer hover:text-[#4F46E5]"
        onClick={checkAdmin}
      />

      {/* <div className="px-10 py-2 bg-green-500">Fail</div> */}
      <Link href={"./"}>
        <div
          className="w-40 h-12 border border-[#4F46E5] mr-2 sm:mr-10 rounded-sm justify-center items-center
      text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white cursor-pointer sm:flex hidden"
        >
          <HomeIcon className="h-8  mr-2" />
          <div className="text-sm font-semibold">Home Page</div>
        </div>
      </Link>

      <Link href={"./"}>
        <HomeIcon className="h-6 mr-8 text-[#4F46E5] sm:hidden" />
      </Link>
    </div>
  );
};

export default NavBar;

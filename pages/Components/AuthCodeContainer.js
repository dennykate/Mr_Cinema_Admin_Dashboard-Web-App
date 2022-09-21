import React, { useState } from "react";

const AuthCodeContainer = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState("");

  const getCode = () => {
    if (username.length == 0 || password.length == 0) return;

    const body = {
      username,
      password,
    };

    fetch("http://localhost:8000/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("Auth Fail");
          setToken("Auth Fail");
          return;
        }

        setToken(data.token);

        localStorage.setItem("auth-code", data.token);
        setUsername("");
        setPassword("");
      });
  };

  const copyCode = () => {
    if (token.length == 0) return;
    navigator.clipboard.writeText(token);

    alert("Copy Success");
  };

  return (
    <div className="w-full h-auto flex justify-center pt-10">
      <div className="sm:w-3/4 w-11/12 h-auto py-5  bg-white shadow-lg rounded-lg ">
        <div className="font-extrabold text-center text-[#4F46E5] text-xl ">
          Get Auth Code
        </div>

        <div className="flex flex-col justify-center items-center my-5">
          <input
            type="text"
            className="w-11/12 sm:h-12 h-10  bg-gray-300 
        outline-[#4F46E5] px-3 rounded-sm"
            placeholder="Admin Name"
            value={username}
            onChange={(text) => {
              setUsername(text.target.value);
            }}
          />
        </div>

        <div className="flex flex-col justify-center items-center my-5">
          <input
            type="password"
            className="w-11/12 sm:h-12 h-10  bg-gray-300 
        outline-[#4F46E5] px-3 rounded-sm"
            placeholder="Password"
            value={password}
            onChange={(text) => {
              setPassword(text.target.value);
            }}
          />
        </div>

        <div className="flex flex-col justify-center items-center my-5">
          <input
            type="text"
            className="w-11/12 sm:h-12 h-10  bg-gray-300 border-2 outline-none
        border-[#4F46E5] px-3 rounded-sm text-[#000]"
            placeholder="Your Code Here"
            value={token}
          />
        </div>

        <div className="w-full h-20 flex justify-center items-center">
          <div
            className=" w-28 h-10 bg-[#4F46E5] flex justify-center items-center text-white rounded-md
          cursor-pointer mx-3 hover:scale-105"
            onClick={getCode}
          >
            Get Code
          </div>

          <div
            className=" w-28 h-10 bg-[#11998e] flex justify-center items-center text-white rounded-md
          cursor-pointer  mx-3 hover:scale-105"
            onClick={copyCode}
          >
            Copy Code
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCodeContainer;

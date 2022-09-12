import React from "react";

const login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="sm:w-96 w-11/12 h-96 bg-white shadow-lg rounded-md ">
        <div
          id="form-header"
          className="text-center text-[#4F46E5] font-medium text-xl mt-4"
        >
          Login Form
        </div>

        <div id="input-container" className="w-11/12 mx-auto  mt-10">
          <div id="username-container" className="w-full h-auto mt-6">
            <div className="text-[#4F46E5] sm:text-md text-sm ml-2 ">
              Username
            </div>
            <input
              type="text"
              className="w-full h-10 bg-[#f5f5f5] border-none outline-[#4F46E5] px-3 text-sm"
            />
          </div>

          <div id="password-container" className="w-full h-auto mt-4">
            <div className="text-[#4F46E5] sm:text-md text-sm ml-2">
              Password
            </div>
            <input
              type="text"
              className="w-full h-10 bg-[#f5f5f5] border-none outline-[#4F46E5] px-3 text-sm"
            />
          </div>

          <div
            id="submit-button-container"
            className="mt-10 ml-2 bg-[#4F46E5] rounded-md w-24 h-10 flex justify-center items-center
            text-white font-bold cursor-pointer hover:bg-white hover:text-[#4F46E5] 
            hover:border hover:border-[#4F46E5]"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

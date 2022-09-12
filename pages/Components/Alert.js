import React, { useEffect, useState } from "react";

const Alert = ({ show, text, color }) => {
  return (
    <>
      {show && (
        <div
          className={`fixed sm:bottom-5 sm:left-5 bottom-2 left-2 sm:px-10 px-5 py-2 rounded-sm z-50 
          text-white sm:text-base text-xs
        ${color}`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Alert;

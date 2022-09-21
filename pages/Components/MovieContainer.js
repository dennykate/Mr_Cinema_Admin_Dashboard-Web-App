import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ItemCard from "./ItemCard";
import Alert from "./Alert";

const MovieContainer = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [refreshCode, setRefreshCode] = useState(true);

  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchMovieData(page);
  }, [page, refreshCode]);

  const fetchMovieData = (page) => {
    fetch(`http://localhost:8000/movie?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length == 0) toggleAlertShow();

        setTotal(data.meta.total);
        setMovies(data.data);
      });
  };

  const prevPage = () => {
    if (page == 1) {
      toggleAlertShow();
      return;
    }

    setPage(parseInt(page) - 1);
  };

  const nextPage = () => {
    const lastPage = Math.floor(total / 12) + 1;
    console.log(lastPage, page);
    if (lastPage == page) {
      toggleAlertShow();
      return;
    }

    setPage(parseInt(page) + 1);
  };

  const inputHandle = (text) => {
    if (text.target.value < 0) {
      toggleAlertShow();
      return;
    }

    setPage(text.target.value);
  };

  const toggleAlertShow = () => {
    setAlertShow(true);
    setText("Page doesn't exist");

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  return (
    <div className="w-full sm:pt-4 pt-2 sm:px-10 px-0 h-screen overflow-scroll hide-scrollbar pb-20">
      <Alert text={text} show={alertShow} color={"bg-red-600"} />

      <Link href={"./add-edit-movie"}>
        <div
          id="add-item-button"
          className="sm:w-32 w-28 sm:h-10 h-8 flex justify-center items-center bg-[#4F46E5] rounded-sm text-white font-mono
        sm:text-md text-sm cursor-pointer hover:bg-white hover:border 
        hover:border-[#4F46E5] hover:text-[#4F46E5] hover:font-bold sm:mx-0 mx-2"
        >
          Add New Movie
        </div>
      </Link>

      <div id="movie-card-container" className="w-full mt-8">
        <div id="next-prev-container" className="w-full h-8">
          <div className="sm:w-48 w-36 sm:h-9 h-8 float-right flex">
            <div
              className="w-1/5 h-full sm:p-2 p-1 cursor-pointer hover:bg-gray-300 rounded-sm
            flex justify-center items-center"
              onClick={prevPage}
            >
              <Image
                src={require("../../public/images/prev-icon.png")}
                alt="Next Icon"
                width={18}
                height={18}
              />
            </div>
            <div
              className="w-1/5 h-full sm:p-2 p-1 cursor-pointer hover:bg-gray-300 rounded-sm
            flex justify-center items-center"
              onClick={nextPage}
            >
              <Image
                src={require("../../public/images/next-icon.png")}
                alt="Next Icon"
                width={18}
                height={18}
              />
            </div>
            <input
              value={page}
              type="number"
              className="w-3/5 outline-[#4F46E5] border-2 border-gray-300 text-center text-black font-bold"
              onChange={inputHandle}
            />
          </div>
        </div>

        <div className="w-full border border-opacity-20 border-black  mt-5">
          {movies.length > 0 &&
            movies.map((data, index) => (
              <ItemCard
                key={index}
                data={data}
                path={"movie"}
                setRefreshCode={setRefreshCode}
                refreshCode={refreshCode}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieContainer;

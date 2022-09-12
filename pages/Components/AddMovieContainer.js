import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  TrashIcon,
  ChevronDoubleUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

import LinksContainer from "./LinksContainer";
import Alert from "./Alert";
import { BackButton } from "./Helper/HelperComponent";

const AddMovieContainer = () => {
  const router = useRouter();

  const [numOfLinks, setNumOfLinks] = useState([]);
  const [links, setLinks] = useState([]);

  const [id, setId] = useState();
  const [code, setCode] = useState();
  const [hd, setHd] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [duration, setDuration] = useState();
  const [content, setContent] = useState();
  const [size, setSize] = useState();
  const [image, setImage] = useState();
  const [movie, setMovie] = useState();
  const [top_rate, setTopRate] = useState();
  const [type, setType] = useState();
  const [slug, setSlug] = useState();
  const [actress, setActress] = useState();

  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchId();
  }, []);

  useEffect(() => {
    fetchEditData();
  }, [router.query]);

  const fetchEditData = () => {
    const { slug } = router.query;
    if (!slug) return;

    fetch(`http://localhost:8000/movies/slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
      });
  };

  const fetchId = () => {
    fetch("http://localhost:8000/movies")
      .then((res) => res.json())
      .then((data) => {
        setId(`${data.meta.total + 1}`);
        if (parseInt(data.meta.total + 1) < 100) {
          setCode("MrPussy-0" + (data.meta.total + 1));
        } else {
          setCode("MrPussy-" + (data.meta.total + 1));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const post = () => {
    let data = {
      id,
      code,
      hd,
      title,
      category,
      duration,
      content,
      size,
      image,
      movie,
      top_rate,
      type,
      slug,
      actress,
      link: links,
    };

    for (let i in data) {
      if (data[i] == undefined || data[i] == "") {
        toggleAlertShow();
        setText("Fail to post");
        return;
      }
    }

    console.log(data);
    toggleAlertShow();
    setText("Success");
  };

  const toggleAlertShow = () => {
    setAlertShow(true);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  return (
    <div className="w-full h-screen overflow-scroll hide-scrollbar pb-20 relative">
      {alertShow && (
        <Alert
          show={alertShow}
          text={text}
          color={text == "Success" ? "bg-green-600" : "bg-red-600"}
        />
      )}

      <BackButton back={"./movie"} />

      <div className="sm:w-11/12 w-full h-auto sm:mt-20 mt-8 mx-auto bg-white shadow-xl sm:py-5 py-2 pb-5">
        <div className="w-1/2 h-auto mx-auto sm:mb-10 mb-2">
          <Image
            src={image ? image : "https://i.postimg.cc/Bbdw9c4b/demo-thumb.jpg"}
            alt="thumbnail"
            width={1280}
            height={720}
          />
        </div>
        <div className="sm:w-11/12 sm:mx-auto mx-1">
          <div className="w-full flex justify-end">
            <div
              className="sm:w-28 w-20 sm:h-10 h-8 rounded-sm bg-green-500 sm:my-5 my-2 
              text-white flex justify-center items-center cursor-pointer hover:bg-black sm:text-base text-xs"
              onClick={post}
            >
              Post
            </div>
          </div>

          <InputCard type={"Id"} placeholder={"id"} setData={setId} id={id} />

          <InputCard
            type={"Code"}
            placeholder={"code"}
            setData={setCode}
            id={code}
          />

          <InputCard type={"Hd"} placeholder={"hd"} setData={setHd} />

          <InputCard type={"Title"} placeholder={"title"} setData={setTitle} />

          <InputCard
            type={"Category"}
            placeholder={"category"}
            setData={setCategory}
          />

          <InputCard
            type={"Duration"}
            placeholder={"duration"}
            setData={setDuration}
          />

          <InputCard
            type={"Content"}
            placeholder={"content"}
            setData={setContent}
          />

          <InputCard type={"Size"} placeholder={"size"} setData={setSize} />

          <InputCard type={"Image"} placeholder={"image"} setData={setImage} />

          <InputCard type={"Movie"} placeholder={"movie"} setData={setMovie} />

          <InputCard
            type={"Top Rate"}
            placeholder={"top_rate"}
            setData={setTopRate}
          />

          <InputCard type={"Type"} placeholder={"type"} setData={setType} />

          <InputCard type={"Slug"} placeholder={"slug"} setData={setSlug} />

          <InputCard
            type={"Actress"}
            placeholder={"actress"}
            setData={setActress}
          />

          <div
            className="sm:w-32 sm:h-10 w-24 h-8 mx-auto bg-[#4F46E5] sm:my-10 mt-5 rounded-md 
            flex justify-center items-center 
          text-white cursor-pointer hover:scale-105 sm:text-base text-xs"
            onClick={() => {
              setNumOfLinks([...numOfLinks, Math.random()]);
            }}
          >
            Add Link
          </div>

          {numOfLinks.map((data, index) => (
            <LinksContainer
              key={index}
              setNumOfLinks={setNumOfLinks}
              numOfLinks={numOfLinks}
              setLinks={setLinks}
              links={links}
            />
          ))}
        </div>

        <a
          className=" fixed sm:w-10 sm:h-10 w-7 h-7 rounded-full bg-[#4F46E5] bottom-5 right-5
        flex justify-center items-center"
          href="#back-to-movie-page"
        >
          <ChevronDoubleUpIcon
            className="sm:h-6 h-4 cursor-pointer text-white animate-bounce
          translate-y-10"
          />
        </a>
      </div>
    </div>
  );
};

const InputCard = ({ type, placeholder, setData, id }) => (
  <div className="w-full h-16 mb-6">
    <div className="ml-1 font-bold text-[#4F46E5]">{type}</div>
    <input
      value={type == "Id" || type == "Code" ? id : undefined}
      type="text"
      className="w-full sm:h-12 h-10 bg-gray-300 px-3 outline-[#4F46E5]"
      placeholder={placeholder}
      onChange={(text) => {
        setData(text.target.value);
      }}
    />
  </div>
);

export default AddMovieContainer;

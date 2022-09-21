import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, Router } from "next/router";
import {
  TrashIcon,
  ChevronDoubleUpIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";

import LinksContainer from "./LinksContainer";
import Alert from "./Alert";
import { BackButton } from "./Helper/HelperComponent";
import { InputCard } from "./Helper/HelperComponent";

const AddMovieContainer = () => {
  const router = useRouter();

  const [edit, setEdit] = useState(false);

  const [numOfLinks, setNumOfLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [editLinks, setEditLinks] = useState([]);

  const [mongoid, setMongoid] = useState();
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
    fetchEditData();
  }, [router.query]);

  const fetchEditData = () => {
    const { slug } = router.query;
    if (!slug) {
      fetchId();
      return;
    }

    setEdit(true);
    fetch(`http://localhost:8000/movie/slug=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setMongoid(data[0]._id);
        encodeLink(data[0].link);
        setAllData(data[0]);
      });
  };

  const encodeLink = (links) => {
    let encodedLink = JSON.parse(links);
    setEditLinks(encodedLink);
  };

  const setAllData = (data) => {
    setId(data.id);
    setCode(data.code);
    setHd(data.hd);
    setTitle(data.title);
    setCategory(data.category);
    setDuration(data.duration);
    setContent(data.content);
    setSize(data.size);
    setImage(data.image);
    setMovie(data.movie);
    setTopRate(data.top_rate);
    setType(data.type);
    setSlug(data.slug);
    setActress(data.actress);
  };

  const fetchId = () => {
    fetch("http://localhost:8000/movie")
      .then((res) => res.json())
      .then((data) => {
        const last_id = parseInt(data.data[0].id) + 1;

        setId(last_id);
        if (last_id < 100) {
          setCode("MrPussy-0" + last_id);
        } else {
          setCode("MrPussy-" + last_id);
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
      link: JSON.stringify(links),
    };

    for (let i in data) {
      if (data[i] == undefined || data[i] == "" || data[i] == []) {
        toggleAlertShow("Fail to post");
        return;
      }
    }

    console.log(data);
    checkAdminAndUpload(data);
  };

  const checkAdminAndUpload = (upload_data) => {
    const authcode = localStorage.getItem("auth-code");
    fetch("http://localhost:8000/user/check-admin", {
      method: "POST",
      headers: {
        authorization: `Bearer ${authcode}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message == "Fail") {
          toggleAlertShow("Unauthorized");
          return;
        }

        if (!edit) {
          uploadToSever(upload_data);
        } else {
          editToSever(upload_data);
        }
      });
  };

  const uploadToSever = (data) => {
    const authcode = localStorage.getItem("auth-code");
    fetch("http://localhost:8000/movie", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authcode}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toggleAlertShow("Success");
        router.push("./movie");
      });
  };

  const editToSever = (data) => {
    const authcode = localStorage.getItem("auth-code");
    fetch(`http://localhost:8000/movie/${mongoid}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authcode}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toggleAlertShow("Success");
        router.push(`./movie`);
      });
  };

  const toggleAlertShow = (text) => {
    setAlertShow(true);
    setText(text);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  return (
    <div className="w-full h-screen overflow-scroll hide-scrollbar pb-20 relative">
      <Alert
        show={alertShow}
        text={text}
        color={text == "Success" ? "bg-green-600" : "bg-red-600"}
      />

      <BackButton back={"./movie"} />

      <div className="sm:w-11/12 w-full h-auto sm:mt-20 mt-8 mx-auto bg-white shadow-xl sm:py-5 py-2 pb-5">
        <div className="w-1/2 h-auto mx-auto sm:mb-10 mb-2">
          <Image
            src={image ? image : "https://i.postimg.cc/Bbdw9c4b/demo-thumb.jpg"}
            alt="thumbnail"
            width={1280}
            height={820}
          />
        </div>
        <div className="sm:w-11/12 sm:mx-auto mx-1">
          <div className="w-full flex justify-end">
            <div
              className={`sm:w-28 w-20 sm:h-10 h-8 rounded-sm bg-green-600 sm:my-5 my-2 
              text-white flex justify-center items-center cursor-pointer hover:bg-black sm:text-base text-xs
              ${edit ? "bg-purple-600" : "bg-green-600"}`}
              onClick={post}
            >
              {edit ? "Edit" : "Post"}
            </div>
          </div>

          <InputCard
            type={"Id"}
            placeholder={"id"}
            setData={setId}
            value={id}
          />

          <InputCard
            type={"Code"}
            placeholder={"code"}
            setData={setCode}
            value={code}
          />

          <InputCard
            type={"Hd"}
            placeholder={"hd"}
            setData={setHd}
            value={hd}
          />

          <InputCard
            type={"Title"}
            placeholder={"title"}
            setData={setTitle}
            value={title}
          />

          <InputCard
            type={"Slug"}
            placeholder={"slug"}
            setData={setSlug}
            value={slug}
          />

          <InputCard
            type={"Category"}
            placeholder={"category"}
            setData={setCategory}
            value={category}
          />

          <InputCard
            type={"Duration"}
            placeholder={"duration"}
            setData={setDuration}
            value={duration}
          />

          <InputCard
            type={"Content"}
            placeholder={"content"}
            setData={setContent}
            value={content}
          />

          <InputCard
            type={"Size"}
            placeholder={"size"}
            setData={setSize}
            value={size}
          />

          <InputCard
            type={"Image"}
            placeholder={"image"}
            setData={setImage}
            value={image}
          />

          <InputCard
            type={"Movie"}
            placeholder={"movie"}
            setData={setMovie}
            value={movie}
          />

          <InputCard
            type={"Top Rate"}
            placeholder={"top_rate"}
            setData={setTopRate}
            value={top_rate}
          />

          <InputCard
            type={"Type"}
            placeholder={"type"}
            setData={setType}
            value={type}
          />

          <InputCard
            type={"Actress"}
            placeholder={"actress"}
            setData={setActress}
            value={actress}
          />

          <div
            className="sm:w-32 sm:h-10 w-24 h-8 mx-auto bg-[#4F46E5] sm:my-10 mt-5 rounded-md 
            flex justify-center items-center 
          text-white cursor-pointer hover:scale-105 sm:text-base text-xs"
            onClick={() => {
              setNumOfLinks([...numOfLinks, { sever: "Default" }]);
            }}
          >
            Add Link
          </div>

          {editLinks.length > 0 &&
            editLinks.map((data, index) => (
              <LinksContainer
                key={index}
                setNumOfLinks={setNumOfLinks}
                numOfLinks={numOfLinks}
                setLinks={setLinks}
                links={links}
                data={data}
              />
            ))}

          {numOfLinks.map((data, index) => (
            <LinksContainer
              key={index}
              setNumOfLinks={setNumOfLinks}
              numOfLinks={numOfLinks}
              setLinks={setLinks}
              links={links}
              data={data}
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

export default AddMovieContainer;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { BackButton, InputCard } from "./Helper/HelperComponent";
import Alert from "./Alert";

const AddCategoryContainer = () => {
  const router = useRouter();

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState();
  const [image, setImage] = useState();

  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchId();
  }, []);

  useEffect(() => {
    setSlug(title.toLowerCase());
  }, [title]);

  const fetchId = () => {
    fetch("http://localhost:8000/category")
      .then((res) => res.json())
      .then((data) => {
        setId(data.meta.total + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const post = () => {
    const data = { id, title, image, slug };

    for (let i in data) {
      if (data[i] == undefined || data[i] == "") {
        toggleAlertShow();
        setText("fail");
        return;
      }
    }

    console.log(data);
    toggleAlertShow();
    setText("success");
    defaultValue();
  };

  const toggleAlertShow = () => {
    setAlertShow(true);

    setTimeout(() => {
      setAlertShow(false);
    }, 3000);
  };

  const defaultValue = () => {
    router.push("./category");
  };

  return (
    <div className="w-full h-screen overflow-scroll hide-scrollbar pb-20 relative">
      {
        <Alert
          text={text}
          show={alertShow}
          color={text == "fail" ? "bg-red-600" : "bg-green-600"}
        />
      }

      <BackButton back={"./category"} />

      <div
        className="sm:w-11/12 w-full bg-white shadow-xl sm:py-5 py-2 pb-5 mx-auto
      sm:mt-20 mt-8"
      >
        <div className="w-1/2 h-auto mx-auto sm:mb-10 mb-2">
          <Image
            src={image ? image : "https://i.postimg.cc/Bbdw9c4b/demo-thumb.jpg"}
            alt="Category Thumbnail"
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

          <InputCard type={"Title"} placeholder={"title"} setData={setTitle} />

          <InputCard
            type={"Slug"}
            placeholder={"slug"}
            setData={setSlug}
            id={slug}
          />

          <InputCard type={"Image"} placeholder={"image"} setData={setImage} />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryContainer;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { BackButton, InputCard } from "./Helper/HelperComponent";
import Alert from "./Alert";

const AddActressContainer = () => {
  const router = useRouter();

  const [edit, setEdit] = useState(false);

  const [id, setId] = useState();
  const [mongoid, setMongoid] = useState();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState();
  const [image, setImage] = useState();
  const [rate, setRate] = useState();

  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchEditData();
  }, [router.query]);

  useEffect(() => {
    setSlug(title.toLowerCase().replace(" ", "-"));
  }, [title]);

  const fetchEditData = () => {
    const { slug } = router.query;
    if (!slug) {
      fetchId();
      return;
    }

    setEdit(true);
    fetch(`http://localhost:8000/actress/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setMongoid(data[0]._id);
        setAllData(data[0]);
      });
  };

  const setAllData = (data) => {
    setId(data.id);
    setTitle(data.title);
    setSlug(data.slug);
    setImage(data.image);
    setRate(data.rate);
  };

  const fetchId = () => {
    fetch("http://localhost:8000/actress")
      .then((res) => res.json())
      .then((data) => {
        setId(data.meta.total + 1);
      });
  };

  const post = () => {
    let data = { id, title, slug, image, rate };

    for (let i in data) {
      if (data[i] == undefined || data[i] == "") {
        toggleAlertShow("Fail");
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
        console.log(data);
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
    fetch("http://localhost:8000/actress", {
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
        router.push("./actress");
      });
  };

  const editToSever = (data) => {
    const authcode = localStorage.getItem("auth-code");
    fetch(`http://localhost:8000/actress/${mongoid}`, {
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
        router.push("./actress");
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
        text={text}
        show={alertShow}
        color={text == "Success" ? "bg-green-600" : "bg-red-600"}
      />

      <BackButton back={"./actress"} />

      <div
        className="sm:w-11/12 w-full bg-white shadow-xl sm:py-5 py-2 pb-5 mx-auto
      sm:mt-20 mt-8"
      >
        <div className="w-1/2 h-auto mx-auto sm:mb-10 mb-2">
          <Image
            src={image ? image : "https://i.postimg.cc/Bbdw9c4b/demo-thumb.jpg"}
            alt="Category Thumbnail"
            width={1280}
            height={820}
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

          <InputCard
            type={"Id"}
            placeholder={"id"}
            setData={setId}
            value={id}
          />

          <InputCard
            type={"Rate"}
            placeholder={"rate"}
            setData={setRate}
            value={rate}
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
            type={"Image"}
            placeholder={"image"}
            setData={setImage}
            value={image}
          />
        </div>
      </div>
    </div>
  );
};

export default AddActressContainer;

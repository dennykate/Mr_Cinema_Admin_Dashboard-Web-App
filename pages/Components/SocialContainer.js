import React, { useEffect, useState } from "react";
import Image from "next/image";

import SocialCard from "./SocialCard";
import Alert from "./Alert";

const SocialContainer = () => {
  const [alertShow, setAlertShow] = useState(false);
  const [text, setText] = useState("");

  const [mongoid, setMongoid] = useState();
  const [facebook, setFacebook] = useState();
  const [messenger, setMessenger] = useState();
  const [telegram, setTelegram] = useState();
  const [email, setEmail] = useState();
  const [viber, setViber] = useState();

  useEffect(() => {
    fetch("http://localhost:8000/socials")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data.data[0]);
      });
  }, []);

  const setAllData = (data) => {
    setMongoid(data._id);
    setFacebook(data.fb_page);
    setMessenger(data.messenger);
    setTelegram(data.telegram_channel);
    setEmail(data.email);
    setViber(data.viber);
  };

  const post = () => {
    const data = {
      fb_page: facebook,
      telegram_channel: telegram,
      messenger,
      email,
      viber,
    };

    console.log(data);
    checkAdminAndUpload(data);
  };

  const checkAdminAndUpload = (upload_data) => {
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
        if (data.message == "Fail") {
          toggleAlertShow("Unauthorized");
          return;
        }

        editToSever(upload_data);
      });
  };

  const editToSever = (data) => {
    const authcode = localStorage.getItem("auth-code");
    fetch(`http://localhost:8000/socials/${mongoid}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authcode}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    <div className=" w-full h-screen overflow-scroll hide-scrollbar py-5 sm:py-10">
      <Alert
        show={alertShow}
        text={text}
        color={text == "Success" ? "bg-green-600" : "bg-red-600"}
      />

      <div className="max-w-3xl mx-auto ">
        <SocialCard
          image={"facebook-icon.png"}
          url={facebook}
          post={post}
          setData={setFacebook}
        />

        <SocialCard
          image={"messenger-icon.png"}
          url={messenger}
          post={post}
          setData={setMessenger}
        />

        <SocialCard
          image={"telegram-icon.png"}
          url={telegram}
          post={post}
          setData={setTelegram}
        />

        <SocialCard
          image={"email-icon.png"}
          url={email}
          post={post}
          setData={setEmail}
        />

        <SocialCard
          image={"viber-icon.png"}
          url={viber}
          post={post}
          setData={setViber}
        />
      </div>
    </div>
  );
};

export default SocialContainer;

import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import SocialContainer from "./Components/SocialContainer";

export default function Social() {
  const router = useRouter();

  const [pathname, setPathname] = useState();

  useEffect(() => {
    const path = router.pathname.split("/")[1];
    setPathname(path);
  }, [router]);

  return (
    <div>
      <Head>
        <title>Social</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainContainer>
        <SideBar pathname={pathname} />
        <RightSideContainer>
          <NavBar />
          <SocialContainer />
        </RightSideContainer>
      </MainContainer>
    </div>
  );
}

const MainContainer = (props) => (
  <div className="flex flex-row">{props.children}</div>
);

const RightSideContainer = (props) => (
  <div className="w-full flex flex-col">{props.children} </div>
);
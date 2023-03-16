import React, { useCallback } from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import Modal from "../components/Modal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home = () => {
  const router = useRouter();

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-black bg-center bg-fixed bg-cover">
      <div className="bg-black min-h-screen w-full h-full lg:bg-opacity-50">
      <nav className="px-12 py-5">
        <Nav
          text="Sign Out"
          onClick={() => {
            signOut();
          }}
          signed={true}
        />
      </nav>
      <div className="flex min-h-screen items-center justify-between">
        <div>AUTH</div>
        <div>
          <button className="" onClick={() => signOut()}>
            Log Out
          </button>
        </div>
      </div>
      </div>

      <div className="flex justify-center">
        <Modal />
      </div>
      </div>
  );
};

export default Home;

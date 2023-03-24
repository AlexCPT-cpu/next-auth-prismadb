import React from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import useTasks from "../hooks/useTasks";
import TaskList from '../components/TaskList'

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
  const { data: tasks = [] } = useTasks();

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
      </div>

      <div className="flex justify-center">
        <Modal />
        <TaskList title="Trending Now" data={tasks} />
      </div>
    </div>
  );
};

export default Home;

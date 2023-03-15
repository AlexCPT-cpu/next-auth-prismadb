import React, { useCallback } from "react";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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
    <div className="flex min-h-screen items-center justify-between">
      <div>AUTH</div>
      <div>
        <button className="" onClick={() => signOut()}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Home;

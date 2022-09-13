import Head from "next/head";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  if (!user) {
    return <Login />;
  }

  return (
    <div className="">
      <Head>
        <title>Por Chat - Talk with bashar</title>
        <meta name="description" content="created for portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Sidebar />
      </main>

      <footer className=""></footer>
    </div>
  );
}

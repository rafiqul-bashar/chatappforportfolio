import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const [chat] = useDocumentData(doc(db, "chats", id));
  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();
  const filterEmail = (users, currentUser) => {
    return users?.filter((user) => user !== currentUser?.email)[0];
  };

  const getMessages = () =>
    messages?.map((msg, index) => {
      const sender = msg.sender === user?.email;
      return (
        <Flex
          key={index}
          alignSelf={!sender ? "flex-start" : "flex-end"}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  useEffect(() => {
    setTimeout(
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
      100
    );
  }, [messages]);

  return (
    <Flex h="100vh">
      <Head>
        <title>Por Chat - Awesome app</title>
      </Head>

      <Sidebar />

      <Flex flex={1} direction="column">
        <Header email={filterEmail(chat?.users, user)} user={chat?.users} />

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{ scrollbarWidth: "none" }}
        >
          {/*map Messages */}
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <TextInput id={id} user={user} />
      </Flex>
    </Flex>
  );
}

export default Chat;

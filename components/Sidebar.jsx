import {
  Avatar,
  Button,
  Flex,
  IconButton,
  MenuButton,
  MenuIcon,
  Text,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { useRouter } from "next/router";
import {
  AddIcon,
  BellIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

const filterEmail = (users, currentUser) => {
  return users?.filter((user) => user !== currentUser.email)[0];
};

function Sidebar() {
  const [user] = useAuthState(auth);
  const { photoURL, displayName, email } = user;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = React.useState(true);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const redirect = (id) => {
    router.push(`/inbox/${id}`);
  };

  const logOut = () => {
    signOut(auth);
    router.push("/");
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && input != user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };
  const Chat = ({ chat }) => {
    return (
      <Flex
        p={3}
        align="center"
        _hover={{ bg: "gray.300", cursor: "pointer" }}
        onClick={() => redirect(chat.id)}
      >
        <Avatar
          mx={menuOpen ? "auto" : null}
          src=""
          marginEnd={menuOpen ? null : 3}
        />
        {!menuOpen ? <Text>{filterEmail(chat.users, user)}</Text> : null}
      </Flex>
    );
  };

  return (
    <Flex
      zIndex={10}
      w={menuOpen ? "120px" : "300px"}
      p={0.5}
      borderEnd="2px solid"
      borderColor="gray.200"
      direction="column"
      h="100vh"
    >
      <Flex
        w="100%"
        h="82px"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p={3}
      >
        <Flex align="center">
          <Avatar src={photoURL} marginEnd={3} />
          {!menuOpen ? <Text>{displayName ? displayName : email}</Text> : null}
        </Flex>

        {/* <IconButton
          size="sm"
          isRound
          icon={<ArrowLeftIcon />}
          onClick={logOut}
        />
         */}

        <IconButton
          size="sm"
          isRound
          icon={<HamburgerIcon />}
          onClick={() => setMenuOpen(!menuOpen)}
        />
      </Flex>
      <Button m={5} p={4} onClick={() => newChat()}>
        {!menuOpen ? "New Chat" : <AddIcon />}
      </Button>
      <Flex
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        {chats
          ?.filter((el) => el.users.includes(user.email))
          .map((el, index) => (
            <Chat key={index} chat={el} />
          ))}
      </Flex>
      <Flex w="full" direction="column" gap={3} p={3}>
        <Button bg={"green.500"} color="white" _hover={{ bg: "green.600" }}>
          {!menuOpen ? "Edit Profile" : <SettingsIcon />}
        </Button>
        <Button bg="gray.300" _hover={{ bg: "gray.200" }}>
          {!menuOpen ? "Logout" : <ExternalLinkIcon />}
        </Button>
      </Flex>
    </Flex>
  );
}

export default Sidebar;

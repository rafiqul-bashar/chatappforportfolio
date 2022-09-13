import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { ChatIcon } from "@chakra-ui/icons";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [user] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const [show, setShow] = React.useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      <Head>
        <title>Login - Please login to continue</title>
      </Head>
      <Center h="100vh">
        <Stack align="center" p={16} rounded="3xl" spacing={12} boxShadow="lg">
          <Box
            bgColor="blue.500"
            w="fit-content"
            p={5}
            rounded="3xl"
            boxShadow="md"
          >
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>
          <form onSubmit={handleSignIn}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              mb={2}
              p={1}
              size="lg"
              type="email"
              variant="flushed"
              placeholder="Enter email"
            />
            <InputGroup size="md">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                size="lg"
                p={1}
                variant="flushed"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              type="submit"
              mt={3}
              w="full"
              boxShadow="md"
              colorScheme="blue"
              textColor="white"
            >
              Sign In
            </Button>
          </form>
          {/* {error && (
            <Box bg="red.400" w="full" p="2">
              <Text color="white" as="p" textAlign={"center"}>
                {error.message}
              </Text>
            </Box>
          )} */}
          <Link href="/register" passHref>
            <p>
              Are you new here ?
              <span className="registerLink">Register Now</span>
            </p>
          </Link>
          <Flex w="full" alignItems="center">
            <Divider orientation="horizontal" />
            <Text textAlign="center" mx={4}>
              or
            </Text>
            <Divider orientation="horizontal" />
          </Flex>
          <Button
            boxShadow="md"
            bg="yellow.400"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            Sign In with Google
          </Button>
        </Stack>
      </Center>
    </>
  );
}

export default Login;

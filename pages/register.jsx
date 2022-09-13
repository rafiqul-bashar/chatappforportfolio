import React from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";

import { ChatIcon } from "@chakra-ui/icons";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import Link from "next/link";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/router";

function Register() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [passErr, setPassErr] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const router = useRouter();
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPassErr(true);
    }
    try {
      await createUserWithEmailAndPassword(email, password);
      if (user.user.email) {
        setSuccess(true);
        setTimeout(() => router.push("/"), 3000);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  if (loading) {
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>;
  }

  return (
    <>
      <Head>
        <title>Sign Up - Fill all the informations to continue</title>
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
            <ChatIcon w="40px" h="40px" color="white" />
          </Box>
          <Text fontSize="2xl" as="b">
            Register
          </Text>
          <form onSubmit={handleSignUp}>
            <Stack>
              {/* <FormControl isRequired>
                <FormLabel>Your name</FormLabel>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </FormControl> */}
              <FormControl isRequired>
                <FormLabel>Your Email</FormLabel>

                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Enter new password</FormLabel>
                <InputGroup size="md">
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
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
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Confirm password</FormLabel>
                <InputGroup size="md">
                  <Input
                    onChange={(e) => setPassword2(e.target.value)}
                    value={password2}
                    required
                    pr="4.5rem"
                    type={show2 ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick2}>
                      {show2 ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
            <Button
              type="submit"
              mt={3}
              w="full"
              boxShadow="md"
              colorScheme="green"
              textColor="white"
              isLoading={loading}
            >
              Register
            </Button>
          </form>
          {passErr && (
            <Box bg="red.400" w="full" p="2">
              <Text color="white" as="p" textAlign={"center"}>
                Password do not match
              </Text>
            </Box>
          )}
          {error && (
            <Box bg="red.400" w="full" p="2">
              <Text color="white" as="p" textAlign={"center"}>
                {error.message}
              </Text>
            </Box>
          )}
          {success && (
            <Box bg="green.400" w="full" p="2">
              <Text color="white" as="p" textAlign={"center"}>
                User Created Successfully!
              </Text>
            </Box>
          )}

          <Link href="/" passHref>
            <p>
              Already registered ?<span className="loginLink">Login Here</span>
            </p>
          </Link>
        </Stack>
      </Center>
    </>
  );
}

export default Register;

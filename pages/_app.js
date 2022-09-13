import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import "../styles/globals.css";

import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
  // 2. Extend the theme to include custom colors, fonts, etc
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      {/* <Sidebar /> */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

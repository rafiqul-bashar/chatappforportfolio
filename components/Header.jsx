import React from "react";
import { Flex, Heading, Avatar } from "@chakra-ui/react";
function Header({ email, user }) {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{user?.displayName ? displayName : email}</Heading>
    </Flex>
  );
}

export default Header;

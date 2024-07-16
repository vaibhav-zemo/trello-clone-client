import React from "react";
import { HStack, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack
      bg={"#000"}
      w={"full"}
      h={12}
      p={4}
      justifyContent={"space-between"}
    >
      <Image
        src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
        alt="Logo"
        w="75px"
      />
      <HStack>
        <Link to="/login">
          <Button h={8} bg="scienceBlue" color="white">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button h={8} bg="scienceBlue" color="white">
            Signup
          </Button>
        </Link>
      </HStack>
    </HStack>
  );
};

export default Header;

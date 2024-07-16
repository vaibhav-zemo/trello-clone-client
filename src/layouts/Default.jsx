import React from "react";
import { Outlet } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Default = () => {
  return (
    <VStack w='100vw' gap={0} bg={'athensGray'} h='100vh' alignItems={'start'} >
        <Navbar />
        <Outlet />
    </VStack>
  );
};

export default Default;

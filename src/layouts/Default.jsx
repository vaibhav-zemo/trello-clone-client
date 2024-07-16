import React from "react";
import { Outlet } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Default = () => {
  return (
    <VStack h={'100vh'} gap={0} bg={'athensGray'} alignItems={'start'} >
        <Navbar />
        <Outlet />
    </VStack>
  );
};

export default Default;

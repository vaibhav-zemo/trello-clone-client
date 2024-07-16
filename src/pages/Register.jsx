import React, { useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { axiosInstance } from "../Axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const randomColor = await axios.get("https://x-colors.yurace.pro/api/random");
      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
        name,
        profileBg: randomColor.data.hex,
      });

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <VStack justifyContent={"center"} alignItems={"center"} w={"full"} h="full">
      <VStack
        bg={"white"}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 10px"}
        borderRadius={"3px"}
        w={"400px"}
        px={8}
        py={10}
        h="auto"
      >
        <VStack gap={10} w="full">
          <Heading fontSize={"xl"}>Sign up to continue</Heading>
          <FormControl>
            <VStack alignItems={"start"} gap={5} w="full">
              <VStack alignItems={"start"} gap={0} w="full">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </VStack>
              <VStack alignItems={"start"} gap={0} w="full">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </VStack>
              <VStack alignItems={"start"} gap={0} w="full">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </VStack>
              <VStack alignItems={"start"} gap={0} w="full">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  placeholder="Enter your password again"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </VStack>
              <Button w="full" bg="scienceBlue" color={"white"} onClick={handleRegister}>
                Sign Up
              </Button>
            </VStack>
          </FormControl>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Register;

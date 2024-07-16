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
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      dispatch(setUser(response?.data?.user));
      dispatch(setToken(response?.data?.token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
          <Heading fontSize={"xl"}>Log in to continue</Heading>
          <FormControl>
            <VStack alignItems={"start"} gap={5} w="full">
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
              <Button
                w="full"
                bg="scienceBlue"
                color={"white"}
                onClick={handleLogin}
              >
                Login
              </Button>
            </VStack>
          </FormControl>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Login;

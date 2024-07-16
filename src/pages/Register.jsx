import React, { useState, useEffect, useRef } from "react";
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
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const toastId = React.useRef(null);

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, []);

  const handleRegister = async () => {
    if (loading) return;
    if (!email || !password || !confirmPassword || !name) {
      return toast.error("Please fill all the fields");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }
    try {
      setLoading(true);
      toastId.current = toast.loading("Registering...", { autoClose: false });
      const randomColor = await axios.get(
        "https://x-colors.yurace.pro/api/random"
      );
      const response = await axiosInstance.post("/auth/register", {
        email,
        password,
        name,
        profileBg: randomColor.data.hex,
      });
      toast.success("Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred");
    }
    finally {
      setLoading(false);
      toast.dismiss(toastId.current);
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
              <Button
                w="full"
                bg="scienceBlue"
                color={"white"}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </VStack>
          </FormControl>
          <ToastContainer />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Register;

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
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const toastId = React.useRef(null);

  useEffect(() => {
    if (user?.token) {
      navigate("/");
    }
  }, []);

  const handleLogin = async () => {
    if (loading) return;
    if (!email || !password) {
      return toast.error("Please fill all the fields");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long");
    }

    toastId.current = toast.loading("Logging in...", { autoClose: false });
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      toast.success("Logged in successfully");
      dispatch(setUser(response?.data?.user));
      dispatch(setToken(response?.data?.token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      localStorage.setItem("token", JSON.stringify(response?.data?.token));
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "An error occurred");
    } finally {
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
          <ToastContainer />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Login;

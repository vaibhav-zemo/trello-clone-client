import React from "react";
import {
  HStack,
  Image,
  Button,
  Box,
  Text,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../slices/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dp = user?.user?.name?.split("")[0].toUpperCase();

  const handleLogout = () => {
    dispatch(setUser({}));
    dispatch(setToken(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <HStack
      bg={"white"}
      w={"full"}
      borderBottom={"1px solid #e2e8f0"}
      h={12}
      p={4}
      justifyContent={"space-between"}
    >
      <Link to="/">
        <Image src="/Images/logo.png" alt="Logo" w="75px" />
      </Link>
      {user?.token && (
        <Link to="/task-board">
          <Button h={8} color={"black"}>
            Task Board
          </Button>
        </Link>
      )}
      {!user?.token && (
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
      )}
      {user?.token && (
        <Menu>
          <MenuButton>
            <Box
              bg={user?.user?.profileBg || "black"}
              w={7}
              h={7}
              borderRadius={"50%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text color={"white"}>{dp}</Text>
            </Box>
          </MenuButton>
          <MenuList maxWidth={"10px"}>
            <Link to="/dashboard">
              <MenuItem>Dashboard</MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              <Text>Logout</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </HStack>
  );
};

export default Header;

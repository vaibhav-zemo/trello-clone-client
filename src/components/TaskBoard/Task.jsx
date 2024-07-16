import React from "react";
import { Box, Text, Button, HStack, VStack, Icon } from "@chakra-ui/react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const Task = ({ name, description, assignedUser, dueDate, tags }) => {
  return (
    <VStack
      bg={"white"}
      w="full"
      borderRadius={"10px"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 0px 10px"}
      alignItems={"start"}
      p={4}
    >
      <HStack alignItems={"center"}>
        <Icon as={IoIosCheckmarkCircleOutline} />
        <Text fontWeight={600} fontSize={"xl"}>
          {name}
        </Text>
      </HStack>
      <Text>{description}</Text>
      <HStack mt={2}>
        {tags.map((tag) => (
          <Text
            borderRadius={"25px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            key={tag}
            color={"white"}
            bg={"scienceBlue"}
            w={20}
            h={8}
          >
            {tag}
          </Text>
        ))}
      </HStack>
      <HStack mt={4}>
        <Box
          bg={assignedUser?.profileBg}
          w={7}
          h={7}
          borderRadius={"50%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"white"}>{assignedUser?.name?.split("")[0]}</Text>
        </Box>
        <Text>{dueDate}</Text>
      </HStack>
    </VStack>
  );
};

export default Task;

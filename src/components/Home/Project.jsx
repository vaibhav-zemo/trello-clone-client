import React from "react";
import { Text, Heading, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Project = ({ project, description, bgColor, projectId }) => {
  return (
    <Link to={`/tasks/${projectId}`}>
      <VStack
        w={"230px"}
        h={"120px"}
        bg={bgColor}
        borderRadius={"10px"}
        alignItems={"start"}
        px={4}
        py={2}
        color={"white"}
      >
        <Heading>{project}</Heading>
        <Text>{description}</Text>
      </VStack>
    </Link>
  );
};

export default Project;

import React from "react";
import { Heading, VStack, HStack, Button, useDisclosure } from "@chakra-ui/react";
import Project from "../components/Home/Project";
import { useState, useEffect } from "react";
import { axiosInstance } from "../Axios";
import ProjectModal from "../components/Home/ProjectModal";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/projects");
      setProjects(response?.data?.list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <VStack
      alignItems={"start"}
      justifyContent={"start"}
      px={"20px"}
      mt={"20px"}
      w="full"
    >
      <HStack w="full" justifyContent={"space-between"}>
        <Heading fontSize={"2xl"}>Your Workspace</Heading>
        <Button color={"white"} bg={"scienceBlue"} onClick={onOpen}>
          Create
        </Button>
        <ProjectModal isOpen={isOpen} onClose={onClose} fetchProjects={fetchProjects} />
      </HStack>
      <HStack flexWrap={'wrap'}>
        {projects.map((project) => (
          <Project
            key={project.projectId}
            project={project.name}
            description={project.description}
            bgColor={project.bgColor}
          />
        ))}
      </HStack>
    </VStack>
  );
};

export default Home;

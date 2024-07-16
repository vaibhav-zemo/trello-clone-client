import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../Axios";
import axios from "axios";

const ProjectModal = ({ isOpen, onClose, fetchProjects }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const createProject = async () => {
    try {
      setLoading(true);
      const randomColor = await axios.get("https://x-colors.yurace.pro/api/random");
      const response = await axiosInstance.post("/projects", {
        name: projectName,
        description: projectDescription,
        bgColor: randomColor.data.hex,
      });
      onClose();
      fetchProjects();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={'center'}>Create a new project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems={"start"} gap={4}>
            <VStack alignItems={'start'} gap={0} w='full'>
              <FormControl>
                <FormLabel>Project Name</FormLabel>
                <Input type="text" placeholder="Project Name" onChange={(e) => setProjectName(e.target.value)} />
              </FormControl>
            </VStack>
            <VStack alignItems={'start'} gap={0} w='full'>
              <FormControl>
                <FormLabel>Project Description</FormLabel>
                <Input type="text" placeholder="Project Description" onChange={(e) => setProjectDescription(e.target.value)} />
              </FormControl>
            </VStack>
            <Button onClick={createProject} w='full' bg="scienceBlue" color={"white"} mt={2} mb={4}>
              Create
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;

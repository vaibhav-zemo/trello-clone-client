import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { axiosInstance } from "../../Axios";
import Select from "react-select";
import { Form, useParams } from "react-router-dom";

const TaskModal = ({ isOpen, onClose, fetchTasks }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [users, setUsers] = useState([]);
  const [assignedUser, setAssignedUser] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();

  const createTask = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/tasks", {
        name: taskName,
        description: taskDescription,
        tags: [tags],
        dueDate,
        assignedUser,
        status,
        projectId,
      });
      onClose();
      fetchTasks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const listUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/users");
      setUsers(response.data?.list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  const options = users.map((user) => {
    return { value: user.id, label: user.name };
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Create Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack gap={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Task Name"
                onChange={(e) => setTaskName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Task Description"
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Due Date</FormLabel>
              <Input type="date" onChange={(e) => setDueDate(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Assigned To</FormLabel>
              <Select
                options={options}
                onChange={(e) => setAssignedUser(e.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input
                placeholder="Tags"
                onChange={(e) => setTags(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                options={[
                  { value: "Backlog", label: "Backlog" },
                  { value: "In discussion", label: "In Discussion" },
                  { value: "In progress", label: "In Progress" },
                  { value: "Done", label: "Done" },
                ]}
                onChange={(e) => setStatus(e.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="scienceBlue"
            color={"white"}
            w="full"
            onClick={createTask}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;

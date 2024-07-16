import React, { useState, useEffect, useRef } from "react";
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
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const toastId = React.useRef(null);

  const createTask = async () => {
    if (loading) return;
    if (!taskName || !taskDescription || !dueDate || !tags || !status) {
      return toast.error("Please fill all the fields");
    }
    try {
      setLoading(true);
      toastId.current = toast.loading("Creating task...", { autoClose: false });
      const response = await axiosInstance.post("/tasks", {
        name: taskName,
        description: taskDescription,
        tags: [tags],
        dueDate,
        assignedUser,
        status,
        projectId,
      });
      toast.success("Task created successfully");
      onClose();
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      toast.dismiss(toastId.current);
    }
  };

  const listUsers = async () => {
    try {
      const response = await axiosInstance.get("/users");
      setUsers(response.data?.list);
    } catch (error) {
      console.log(error);
    } finally {
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
        <ToastContainer />
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;

import React, { useState, useEffect, useRef } from "react";
import {
  Flex,
  VStack,
  Heading,
  Icon,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { axiosInstance } from "../Axios";
import { useParams, useLocation } from "react-router-dom";
import Task from "../components/TaskBoard/Task";
import { FaPlus } from "react-icons/fa";
import TaskModal from "../components/TaskBoard/TaskModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskBoard = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const toastId = useRef(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      toastId.current = toast.loading("Fetching tasks...", { autoClose: false });
      if (location.pathname === "/task-board") {
        const response = await axiosInstance("/tasks");
        setTask(response.data?.list);
      } else {
        const project = await axiosInstance(`/projects/${projectId}`);
        setTask(project.data?.tasks?.list);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
      toast.dismiss(toastId.current);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [location.pathname, projectId]);

  const backlogTasks = task.filter((task) => task.status === "Backlog");
  const inDiscussionTasks = task.filter(
    (task) => task.status === "In discussion"
  );
  const inProgressTasks = task.filter((task) => task.status === "In progress");
  const doneTasks = task.filter((task) => task.status === "Done");

  return (
    <Flex mt={10} w="full" justifyContent={"space-around"} flexWrap={"wrap"}>
      <VStack alignItems={"start"} w="20%" minH={"232px"}>
        <HStack justifyContent={"space-between"} w="full">
          <Heading>Backlog</Heading>
          <Icon as={FaPlus} onClick={onOpen} cursor={"pointer"} />
          <TaskModal
            isOpen={isOpen}
            onClose={onClose}
            fetchTasks={fetchTasks}
          />
        </HStack>
        <VStack w="full" mt={4}>
          {backlogTasks.map((task) => (
            <Task
              key={task.taskId}
              name={task.name}
              description={task.description}
              assignedUser={task.assignedUser}
              dueDate={task.dueDate}
              tags={task.tags}
            />
          ))}
        </VStack>
      </VStack>
      <VStack alignItems={"start"} w="20%" minH={"232px"}>
        <HStack justifyContent={"space-between"} w="full">
          <Heading>In Discussion</Heading>
          <Icon as={FaPlus} onClick={onOpen} cursor={"pointer"} />
        </HStack>
        <VStack w="full" mt={4}>
          {inDiscussionTasks.map((task) => (
            <Task
              key={task.taskId}
              name={task.name}
              description={task.description}
              assignedUser={task.assignedUser}
              dueDate={task.dueDate}
              tags={task.tags}
            />
          ))}
        </VStack>
      </VStack>
      <VStack alignItems={"start"} w="20%" minH={"232px"}>
        <HStack justifyContent={"space-between"} w="full">
          <Heading>In Progress</Heading>
          <Icon as={FaPlus} onClick={onOpen} cursor={"pointer"} />
        </HStack>
        <VStack w="full" mt={4}>
          {inProgressTasks.map((task) => (
            <Task
              key={task.taskId}
              name={task.name}
              description={task.description}
              assignedUser={task.assignedUser}
              dueDate={task.dueDate}
              tags={task.tags}
            />
          ))}
        </VStack>
      </VStack>
      <VStack alignItems={"start"} w="20%" minH={"232px"}>
        <HStack justifyContent={"space-between"} w="full">
          <Heading>Done</Heading>
          <Icon as={FaPlus} onClick={onOpen} cursor={"pointer"} />
        </HStack>
        <VStack w="full" mt={4}>
          {doneTasks.map((task) => (
            <Task
              key={task.taskId}
              name={task.name}
              description={task.description}
              assignedUser={task.assignedUser}
              dueDate={task.dueDate}
              tags={task.tags}
            />
          ))}
        </VStack>
        <ToastContainer />
      </VStack>
    </Flex>
  );
};

export default TaskBoard;

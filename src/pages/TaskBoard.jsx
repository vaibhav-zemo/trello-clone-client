import React, { useState, useEffect } from "react";
import {
  Flex,
  VStack,
  Heading,
  Icon,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { axiosInstance } from "../Axios";
import { useParams } from "react-router-dom";
import Task from "../components/TaskBoard/Task";
import { FaPlus } from "react-icons/fa";
import TaskModal from "../components/TaskBoard/TaskModal";

const TaskBoard = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const project = await axiosInstance(`/projects/${projectId}`);
      setTask(project.data?.tasks?.list);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
      </VStack>
    </Flex>
  );
};

export default TaskBoard;

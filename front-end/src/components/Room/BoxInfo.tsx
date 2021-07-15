import {
  Box,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment";

export interface IBoxInfoProps {
  titleBox: string;
}

export default function BoxInfo(props: IBoxInfoProps) {
  const { titleBox } = props;
  const roomReducer = JSON.parse(localStorage.getItem("currentRoom"));
  return (
    <Box
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Heading as="h2" size="xl">
        {titleBox}
      </Heading>
      <Box py={4} px={12}>
        <HStack justifyContent="center">
          <Text fontSize="3xl" color="gray.500">
            ID
          </Text>
          <Text fontSize="5xl" fontWeight="900">
            {roomReducer.roomId}
          </Text>
        </HStack>
      </Box>
      <VStack>
        <List spacing={3} textAlign="start" px={12}>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            Private
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            Host: {roomReducer.members[0]}
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            Create at: {moment(roomReducer.createdAt).format("MMM Do YY")}
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
}

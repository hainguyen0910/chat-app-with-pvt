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
  const roomReducer = JSON.parse(localStorage.getItem("currentRoom") || "{}");
  return (
    <Box
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={["1", "2", "3", "3"]}
      mb={5}
    >
      <Heading fontSize={["sm", "md", "md", "xl"]}>{titleBox}</Heading>
      <Box py={4} px={12}>
        <HStack justifyContent="center">
          <Text fontSize="xl" color="gray.500">
            ID
          </Text>
          <Text
            fontSize={["sm", "md", "md", "xl"]}
            fontWeight={["500", "500", "500", "900"]}
          >
            {roomReducer.roomId}
          </Text>
        </HStack>
      </Box>
      <List spacing={3} textAlign="start">
        <ListItem>
          <ListIcon as={FaCheckCircle} color="green.500" />
          Private
        </ListItem>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="green.500" />
          {/* Host: {roomReducer.members[0].fullname} */}
          Host
        </ListItem>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="green.500" />
          {/* Create at: {moment(roomReducer.createdAt).format("MMM Do YY")} */}
          Create at
        </ListItem>
      </List>
    </Box>
  );
}

import {
  Box,
  Center,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
import moment from "moment";

export interface IBoxInfoProps {
  titleBox: string;
  room: any;
  disabled: boolean;
}

export default function BoxInfo(props: IBoxInfoProps) {
  const { titleBox, room, disabled } = props;

  return (
    <Box
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={["1", "2", "3", "3"]}
      mb={5}
    >
      {disabled ? (
        <Center mt={8} h={"90%"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
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
                {room.roomId}
              </Text>
            </HStack>
          </Box>
          <List
            spacing={3}
            textAlign="start"
            fontSize="md"
            fontWeight="600"
            color="gray.400"
          >
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              <Text display="inline">Private</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Host: {room.members[0].fullname}
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Create at: {moment(room.createdAt).format("MMM Do YY")}
            </ListItem>
          </List>
        </>
      )}
    </Box>
  );
}

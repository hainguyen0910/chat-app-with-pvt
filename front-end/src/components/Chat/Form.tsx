import * as React from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import InfoBar from "./InfoBar";
import Messages from "components/Message/Messages";
import InputComponent from "./Input";

export interface IFormProps {}

export default function Form(props: IFormProps) {
  return (
    <Stack
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      w={"100%"}
      minH={"80%"}
      spacing={4}
      divider={
        <StackDivider borderColor={useColorModeValue("gray.100", "gray.700")} />
      }
    >
      <InfoBar />
      <Messages />
      <InputComponent />
    </Stack>
  );
}

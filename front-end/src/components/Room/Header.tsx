import * as React from "react";
import {
  Box,
  Center,
  Flex,
  useColorModeValue,
  Icon,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { history } from "App";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <Flex
      justify="space-between"
      align="center"
      p={2}
      px={5}
      borderBottomWidth={2}
      borderBottomColor={"white"}
    >
      <Icon
        as={BiArrowBack}
        color="gray.500"
        w={6}
        h={6}
        ml={3}
        style={{ cursor: "pointer" }}
        onClick={() => history.goBack()}
      />
      <Text fontSize="5xl" fontWeight="900" color={"gray"}>
        PVT CHAT
      </Text>
      <Avatar
        size={"md"}
        src={
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
        }
        alt={"Author"}
        css={{
          border: "2px solid white",
        }}
        cursor={"pointer"}
      />
    </Flex>
  );
}

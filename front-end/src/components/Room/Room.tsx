import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import * as React from "react";

export interface IRoomProps {}

export default function Room(props: IRoomProps) {
  return (
    <Flex align={"center"}>
      <Avatar
        size={"sm"}
        // src={item.avatar}
        alt={"Author"}
        css={{
          border: "2px solid white",
        }}
        justifyContent="space-between"
      />
      <Flex ml={3} maxW="60%">
        <Flex flexDir={"column"} maxW="100%">
          <Text
            fontSize="sm"
            color="teal.400"
            fontWeight="bold"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            Room name
          </Text>
          <Text fontSize="xs" color="gray.400" fontWeight="bold">
            Full name:{" "}
            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              Tin nhắn [Hình ảnh] [Sticker] Tin nhắn [Hình ảnh] [Sticker]
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Text
        fontSize="xs"
        color="gray.400"
        fontWeight="bold"
        w="40%"
        textAlign="right"
      >
        15 phút
      </Text>
    </Flex>
  );
}

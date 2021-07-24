import { Avatar, Flex, Text } from "@chakra-ui/react";
import * as React from "react";

export interface IMessageProps {
  isCurrentUser: boolean;
  message: any;
}

export default function Message(props: IMessageProps) {
  const { isCurrentUser, message } = props;

  return (
    <Flex m={3} flexDir="column" alignItems="flex-start">
      {!isCurrentUser && (
        <Text fontSize="sm" fontWeight="600" color="gray.400">
          {message.sender.fullname}
        </Text>
      )}
      <Flex w={"100%"} justify={isCurrentUser ? "flex-end" : "flex-start"}>
        {!isCurrentUser && (
          <Avatar
            size={"sm"}
            src={message.sender.avatar}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        )}
        <p
          style={{
            fontWeight: 600,
            width: "auto",
            padding: "0.25rem 0.75rem",
            backgroundColor: isCurrentUser ? "#38B2AC" : "#CBD5E0",
            color: isCurrentUser ? "white" : "black",
            borderRadius: "10px",
            maxWidth: "50%",
          }}
        >
          {message.message}
        </p>
      </Flex>
    </Flex>
  );
}

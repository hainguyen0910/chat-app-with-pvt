import { Flex } from "@chakra-ui/react";
import * as React from "react";

export interface IMessageProps {
  isCurrentUser: boolean;
  message: any;
}

export default function Message(props: IMessageProps) {
  const { isCurrentUser, message } = props;

  return (
    <Flex w={"auto"} justify={isCurrentUser ? "flex-end" : "flex-start"} m={3}>
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
  );
}

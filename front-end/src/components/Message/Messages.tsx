import { Box } from "@chakra-ui/react";
import * as React from "react";
import Message from "./Message";

export interface IMessagesProps {}

export default function Messages(props: IMessagesProps) {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      px={3}
      py={1}
      maxH={"60vh"}
      style={{ overflow: "auto" }}
      borderRadius={6}
    >
      <Message isCurrentUser={true} />
      <Message isCurrentUser={false} />
      <Message isCurrentUser={true} />
      <Message isCurrentUser={false} />
      <Message isCurrentUser={true} />
      <Message isCurrentUser={false} />
      <Message isCurrentUser={true} />
      <Message isCurrentUser={false} />
      <Message isCurrentUser={true} />
      <Message isCurrentUser={false} />
      <Message isCurrentUser={true} />
      <Message isCurrentUser={false} />
    </Box>
  );
}

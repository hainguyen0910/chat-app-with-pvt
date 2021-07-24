import { Alert, AlertIcon, Box, Center } from "@chakra-ui/react";
import * as React from "react";
import Message from "./Message";

export interface IMessagesProps {
  messages: any;
}

export default function Messages(props: IMessagesProps) {
  const { messages } = props;
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");

  if (!(messages.length > 0)) {
    return (
      <Center mt={3}>
        <Alert status="info">
          <AlertIcon />
          No messages!
        </Alert>
      </Center>
    );
  }

  return (
    <Box
      mt={3}
      border="1px"
      borderColor="gray.200"
      px={3}
      py={1}
      h={"60vh"}
      style={{ overflow: "scroll" }}
      borderRadius={6}
    >
      {messages.map((item: any, index: any) => (
        <Message
          isCurrentUser={auth.username === item.sender.username}
          message={item}
        />
      ))}
      <div className="scroll-bottom" ref={messagesEndRef} />
    </Box>
  );
}

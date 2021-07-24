import { Flex, FormControl, FormLabel, Icon, Input } from "@chakra-ui/react";
import * as React from "react";
import { FiSend } from "react-icons/fi";

export interface IInputComponentProps {
  sendMessage: (message: any) => void;
}

export default function InputComponent(props: IInputComponentProps) {
  const { sendMessage } = props;
  const [message, setMessage] = React.useState("");

  return (
    <FormControl id="message">
      <FormLabel>Send messages</FormLabel>
      <Flex align="center">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(message);
              setMessage("");
            }
          }}
        />
        <Icon
          onClick={() => {
            sendMessage(message);
            setMessage("");
          }}
          as={FiSend}
          color="green.500"
          w={6}
          h={6}
          ml={3}
          style={{ cursor: "pointer" }}
        />
      </Flex>
    </FormControl>
  );
}

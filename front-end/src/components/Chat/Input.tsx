import { Input, FormControl, FormLabel, Icon, Flex } from "@chakra-ui/react";
import * as React from "react";
import { FiSend } from "react-icons/fi";

export interface IInputComponentProps {}

export default function InputComponent(props: IInputComponentProps) {
  return (
    <FormControl id="message">
      <FormLabel>Send messages</FormLabel>
      <Flex align="center">
        <Input type="text" />
        <Icon
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

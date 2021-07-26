import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";
import Emoji from "components/Emoji/Emoji";
import * as React from "react";
import { BiHappy } from "react-icons/bi";
import { FiSend } from "react-icons/fi";

export interface IInputComponentProps {
  sendMessage: (message: any) => void;
}

export default function InputComponent(props: IInputComponentProps) {
  const { sendMessage } = props;
  const [message, setMessage] = React.useState("");
  const [isShowEmoji, setIsShowEmoji] = React.useState(false);
  const [cursorPosition, setCursorPosition] = React.useState();
  const inputRef = React.useRef();

  const handleShowEmoji = () => {
    inputRef.current.focus();
    setIsShowEmoji(!isShowEmoji);
  };

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

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
          ref={inputRef}
        />
        <Box>
          <Icon
            as={BiHappy}
            // aria-label="emoji"
            color="green.500"
            w={6}
            h={6}
            ml={3}
            cursor="pointer"
            bg="transparent"
            _hover={{
              backgroundColor: "transparent",
            }}
            onClick={handleShowEmoji}
          />
          <Emoji
            isShowEmoji={isShowEmoji}
            message={message}
            setMessage={setMessage}
            inputRef={inputRef}
            setCursorPosition={setCursorPosition}
          />
        </Box>

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

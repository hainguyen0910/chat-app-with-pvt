/* eslint-disable no-restricted-globals */
import { Center, Flex, Spinner, useColorModeValue } from "@chakra-ui/react";
import Messages from "components/Message/Messages";
import * as React from "react";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import InputComponent from "./Input";
export interface IChatBoardProps {
  room: any;
  disabled: boolean;
  setDisabled: any;
}

let socket: any;

export default function ChatBoard(props: IChatBoardProps) {
  const { room, disabled, setDisabled } = props;

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const ENDPOINT = "http://192.168.1.16:8080/";
    const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token;
    socket = io(ENDPOINT, { query: { token } });
    socket.emit("join", room.roomId);
  }, [room.roomId]);

  React.useEffect(() => {
    setDisabled(true);
    socket.emit("sendAllMessages", room.roomId);

    socket.on("receiveAllMessages", (data: any) => {
      setMessages(data);
      setDisabled(false);
    });
  }, [room.roomId]);

  const sendMessage = (message: any) => {
    console.log("messages outside", messages);

    if (message !== "") {
      socket.emit("sendNewMessage", { roomId: room.roomId, message });
      socket.on("receiveNewMessage", (data: any) => {
        console.log("messages", messages);

        const result = [...messages, data] as any;
        console.log("result", result);
        console.log("data", data);

        setMessages(result);
      });
    }
  };

  return (
    <Flex
      flexDir={"column"}
      justify="space-between"
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={["1", "2", "3", "3"]}
      w={"100%"}
      // minH={"70vh"}
      // maxH={"70vh"}
      h={"100%"}
      spacing={4}
    >
      {disabled ? (
        <Center mt={8} h={"90%"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
          <Flex flexDir={"column"}>
            <InfoBar roomName={room?.name} />
            <Messages messages={messages} />
          </Flex>
          <InputComponent sendMessage={sendMessage} />
        </>
      )}
    </Flex>
  );
}

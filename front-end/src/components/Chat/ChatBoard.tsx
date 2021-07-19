/* eslint-disable no-restricted-globals */
import { Flex, useColorModeValue } from "@chakra-ui/react";
import Messages from "components/Message/Messages";
import * as React from "react";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import InputComponent from "./Input";
export interface IChatBoardProps {
  location: any;
}

let socket: any;

export default function ChatBoard(props: IChatBoardProps) {
  const { location: path } = props;
  const roomId = location.pathname.split("/")[2];

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const ENDPOINT = "http://localhost:8080";
    const token = JSON.parse(localStorage.getItem("auth") || "{}")?.token;
    socket = io(ENDPOINT, { query: { token } });
    socket.emit("join", roomId);
  }, []);

  React.useEffect(() => {
    socket.emit("sendAllMessages", roomId);

    socket.on("receiveAllMessages", (data: any) => {
      setMessages(data);
      console.log(data);
    });
  }, []);

  const sendMessage = (message: any) => {
    socket.emit("sendNewMessage", { roomId, message });
    socket.on("receiveNewMessage", (data: any) => {
      const result = [...messages, data] as any;
      setMessages(result);
    });
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
      <Flex flexDir={"column"}>
        <InfoBar />
        <Messages messages={messages} />
      </Flex>
      <InputComponent sendMessage={sendMessage} />
    </Flex>
  );
}

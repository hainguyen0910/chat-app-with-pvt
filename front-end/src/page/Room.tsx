import { Box, Center, Flex, useColorModeValue } from "@chakra-ui/react";
import ChatBoard from "components/Chat/ChatBoard";
import BoxInfo from "components/Room/BoxInfo";
import BoxUsers from "components/Room/BoxUsers";
import Header from "components/Header/Header";
import * as React from "react";
import { history } from "App";
import { RoomContext } from "contexts/room/room.context";

export interface RoomProps {}

interface RoomContextInterface {
  roomReducer: object;
  setRoomReducer: (state: any) => void;
  joinRoom: (roomID: string) => void;
  createRoom: (roomName: string) => void;
  getAllRoom: () => void;
}

export default function Room(props: RoomProps) {
  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  if (auth === "{}") {
    history.push("/login");
  }

  const roomContext: RoomContextInterface = React.useContext(RoomContext);
  const { roomReducer } = roomContext;

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      minH="100vh"
    >
      <Header />
      <Flex color="black.50">
        <Box w="70%" p={5} maxH={"100%"}>
          <ChatBoard />
        </Box>
        <Box w="30%" p={5} maxH={"80vh"}>
          <BoxInfo titleBox="Room info" />
          <BoxUsers titleBox="Users in room" />
        </Box>
      </Flex>
    </Box>
  );
}

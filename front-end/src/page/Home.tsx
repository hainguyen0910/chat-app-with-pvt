import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { history } from "App";
import ChatBoard from "components/Chat/ChatBoard";
import Header from "components/Header/Header";
import BoxInfo from "components/Room/BoxInfo";
import BoxUsers from "components/Room/BoxUsers";
import ListRoom from "components/Room/ListRoom";
import { AppContext } from "contexts/app/app.context";
import { RoomContext } from "contexts/room/room.context";
import React, { useContext, useState } from "react";

interface loadingInterface {
  isLoading: boolean;
  setIsLoading: {
    on: () => void;
    off: () => void;
  };
}

interface RoomContextInterface {
  roomReducer: object;
  setRoomReducer: (state: any) => void;
  joinRoom: (roomID: string) => void;
  createRoom: (roomName: string) => void;
  getAllRoom: () => void;
}

interface RoomProps {}

export default function Home(props: RoomProps) {
  if (!JSON.parse(localStorage.getItem("auth"))) {
    history.push("/login");
  }
  const loading: loadingInterface = useContext(AppContext);

  const roomContext: RoomContextInterface = React.useContext(RoomContext);
  const { roomReducer } = roomContext;

  const { isLoading, setIsLoading } = loading;

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      minH="100vh"
    >
      <Header />
      <Flex color="black.50">
        <Box
          w={["0", "0", "20%", "20%"]}
          p={["1", "2", "3", "3"]}
          h={"90vh"}
          display={["none", "none", "block", "block"]}
        >
          <ListRoom />
        </Box>
        <Box
          w={["100%", "100%", "60%", "60%"]}
          h={"90vh"}
          p={["1", "2", "3", "3"]}
        >
          <ChatBoard />
        </Box>

        <Box
          w={["0", "0", "20%", "20%"]}
          maxH={"100%"}
          display={["none", "none", "block", "block"]}
          p={["1", "2", "3", "3"]}
        >
          <BoxInfo titleBox="Room info" />
          <BoxUsers titleBox="Users in room" />
        </Box>
      </Flex>
    </Box>
  );
}

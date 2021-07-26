import {
  Box,
  Center,
  Flex,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { history } from "App";
import BoxInfo from "components/Box/BoxInfo";
import BoxUsers from "components/Box/BoxUsers";
import ChatBoard from "components/Chat/ChatBoard";
import Header from "components/Header/Header";
import ListRoom from "components/Room/ListRoom";
import Welcome from "components/Welcome/Welcome";
import { AppContext } from "contexts/app/app.context";
import { RoomContext } from "contexts/room/room.context";
import React, { useEffect, useState } from "react";

interface RoomContextInterface {
  roomReducer: object;
  setRoomReducer: (state: any) => void;
  joinRoom: (roomID: string) => void;
  createRoom: (roomName: string) => void;
  getAllRoom: () => void;
  rooms: any;
  setRooms: () => void;
}

interface AppContextInterface {
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
}

interface RoomProps {}

export default function Home(props: RoomProps) {
  if (!JSON.parse(localStorage.getItem("auth") || "{}")?.token) {
    history.push("/login");
  }

  const roomContext: RoomContextInterface = React.useContext(RoomContext);
  const { roomReducer, getAllRoom } = roomContext;

  const appContext: AppContextInterface = React.useContext(AppContext);
  const { disabled, setDisabled } = appContext;

  useEffect(() => {
    getAllRoom();
  }, [roomReducer]);

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      minH="100vh"
    >
      <Header />
      <Flex color="black.50">
        <Box
          // w={["0", "0", "20%", "20%"]}
          w={["0", "0", "20rem", "20rem"]}
          p={["1", "2", "3", "3"]}
          h={"90vh"}
          display={["none", "none", "block", "block"]}
        >
          <ListRoom disabled={disabled} setDisabled={setDisabled} />
        </Box>
        {roomReducer?.roomId ? (
          <>
            <Box
              w={["100%", "100%", "100%", "60%"]}
              h={"90vh"}
              p={["1", "2", "3", "3"]}
            >
              <ChatBoard
                room={roomReducer}
                disabled={disabled}
                setDisabled={setDisabled}
              />
            </Box>

            <Box
              w={["0", "0", "0", "20%"]}
              maxH={"100%"}
              display={["none", "none", "none", "block"]}
              p={["1", "2", "3", "3"]}
            >
              <BoxInfo
                titleBox="Room info"
                room={roomReducer}
                disabled={disabled}
              />
              <BoxUsers
                titleBox="Member"
                room={roomReducer}
                disabled={disabled}
              />
            </Box>
          </>
        ) : (
          <Welcome />
        )}
      </Flex>
    </Box>
  );
}

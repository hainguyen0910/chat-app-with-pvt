import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { history } from "App";
import BoxInfo from "components/Box/BoxInfo";
import BoxUsers from "components/Box/BoxUsers";
import ChatBoard from "components/Chat/ChatBoard";
import Header from "components/Header/Header";
import ListRoom from "components/Room/ListRoom";
import Welcome from "components/Welcome/Welcome";
import { AppContext } from "contexts/app/app.context";
import { RoomContext } from "contexts/room/room.context";
import React, { useContext } from "react";

interface loadingInterface {
  isLoading: any;
  setIsLoading: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  // setIsLoading: any;
}

interface RoomContextInterface {
  roomReducer: object;
  setRoomReducer: (state: any) => void;
  joinRoom: (roomID: string) => void;
  createRoom: (roomName: string) => void;
  getAllRoom: () => void;
}

interface RoomProps {}

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function Home(props: RoomProps) {
  if (!JSON.parse(localStorage.getItem("auth") || "{}")?.token) {
    history.push("/login");
  }
  const loading: loadingInterface = useContext(AppContext);
  console.log(loading);

  const roomContext: RoomContextInterface = React.useContext(RoomContext);
  const { roomReducer } = roomContext;

  const { isLoading, setIsLoading } = loading;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          minW={["0", "0", "20vw", "20vw"]}
          p={["1", "2", "3", "3"]}
          h={"90vh"}
          display={["none", "none", "block", "block"]}
        >
          <ListRoom />
        </Box>
        {/* <Box
          w={["100%", "100%", "100%", "60%"]}
          h={"90vh"}
          p={["1", "2", "3", "3"]}
        >
          <ChatBoard />
        </Box>

        <Box
          w={["0", "0", "0", "20%"]}
          maxH={"100%"}
          display={["none", "none", "none", "block"]}
          p={["1", "2", "3", "3"]}
        >
          <BoxInfo titleBox="Room info" />
          <BoxUsers titleBox="Users in room" />
        </Box> */}
        <Welcome />
      </Flex>
    </Box>
  );
}

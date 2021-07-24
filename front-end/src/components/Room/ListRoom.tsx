import {
  Box,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  Spinner,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "components/Modal/Modal";
import { RoomContext } from "contexts/room/room.context";
import * as React from "react";
import { BiSearch } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";
import { MdGroupAdd } from "react-icons/md";
import Room from "./Room";

interface IListRoomProps {
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
}

interface RoomContextInterface {
  roomReducer: object;
  setRoomReducer: (state: any) => void;
  joinRoom: (roomID: string) => void;
  createRoom: (roomName: string) => void;
  getAllRoom: () => void;
  rooms: any;
  setRooms: () => void;
  leaveRoom: (roomId: string) => void;
}

export default function ListRoom(props: IListRoomProps) {
  const roomContext: RoomContextInterface = React.useContext(RoomContext);
  const {
    roomReducer,
    setRoomReducer,
    joinRoom,
    createRoom,
    rooms,
    leaveRoom,
  } = roomContext;
  const { disabled, setDisabled } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isJoin, setIsJoin] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const onChangeInput = (value: string) => {
    if (isJoin) {
      setInputValue(value.replace(/\s+/g, ""));
    } else {
      setInputValue(value);
    }
  };

  const handleOnSubmit = (value: string, isJoin: boolean) => {
    if (value !== "") {
      if (isJoin) {
        joinRoom(value);
      } else {
        createRoom(value);
      }
      setInputValue("");
      onClose();
    }
  };

  return (
    <Box
      py={4}
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={["1", "2", "3", "3"]}
      h={"100%"}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearch color="gray.300" />}
        />
        <Input type="tel" placeholder="Search room" />
        <Tooltip
          label="Create new room"
          aria-label="New chat tooltip"
          placement="top"
        >
          <IconButton
            colorScheme="teal"
            aria-label="New chat"
            icon={<MdGroupAdd />}
            ml={3}
            onClick={() => {
              setIsJoin(false);
              onOpen();
            }}
          />
        </Tooltip>

        <Tooltip
          label="Join new room"
          aria-label="New chat tooltip"
          placement="top"
        >
          <IconButton
            colorScheme="teal"
            aria-label="New chat"
            icon={<GiExitDoor />}
            ml={3}
            onClick={() => {
              setIsJoin(true);
              onOpen();
            }}
          />
        </Tooltip>
      </InputGroup>
      {rooms?.length > 0 ? (
        <List
          spacing={3}
          textAlign="start"
          style={{ overflow: "auto" }}
          maxH={"90%"}
          mt={"20px"}
        >
          {rooms.map((item: any, index: number) => (
            <Room
              room={item}
              key={index}
              disabled={disabled}
              onClick={() => {
                setDisabled(true);
                setRoomReducer(item);
              }}
              active={roomReducer?._id === item?._id}
              leaveRoom={leaveRoom}
            />
          ))}
        </List>
      ) : (
        <Center mt={8} h={"90%"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Center>
      )}

      <ModalComponent
        isOpen={isOpen}
        onClose={() => {
          setInputValue("");
          onClose();
        }}
        modalTitle={isJoin ? "Join room 😈" : "Create room 😈"}
        titleButton={isJoin ? "Join" : "Create"}
        handleOnSubmit={() => handleOnSubmit(inputValue, isJoin)}
      >
        <Input
          type="text"
          placeholder={isJoin ? "Room ID" : "Room name"}
          value={inputValue}
          onChange={(e) => onChangeInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleOnSubmit(inputValue, isJoin);
          }}
        />
      </ModalComponent>
    </Box>
  );
}

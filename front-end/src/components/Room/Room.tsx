import {
  Avatar,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import ModalComponent from "components/Modal/Modal";
import * as React from "react";
import { ImExit } from "react-icons/im";
import styled from "styled-components";
export interface IRoomProps {
  room: any;
  onClick: any;
  active: any;
  leaveRoom: any;
  disabled: boolean;
}

export default function Room(props: IRoomProps) {
  const { room, active, onClick, leaveRoom, disabled } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <RoomDetail disabled={disabled}>
      <Flex
        align={"center"}
        cursor="pointer"
        p={1}
        _hover={{ backgroundColor: "#EDF2F7" }}
        className={active ? "active" : ""}
      >
        <Avatar
          size={"sm"}
          // src={item.avatar}
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
          justifyContent="space-between"
          onClick={active ? null : onClick}
        />
        <Flex ml={3} maxW="60%">
          <Flex
            flexDir={"column"}
            maxW="100%"
            onClick={active ? null : onClick}
          >
            <Text
              fontSize="sm"
              color="teal.400"
              fontWeight="bold"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {room.name}
            </Text>
            <Text fontSize="xs" color="gray.400" fontWeight="bold">
              <Text
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
              >
                hainguyen: hello ae hello
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex flexDir="column" w="100%" alignItems="flex-end">
          <Tooltip label="Leave room" aria-label="Option" placement="top">
            <IconButton
              aria-label="option"
              icon={<ImExit />}
              size="xs"
              backgroundColor="transparent"
              w="1.5rem"
              mr="1"
              onClick={onOpen}
            />
          </Tooltip>

          <Text
            fontSize="xs"
            color="gray.400"
            fontWeight="bold"
            textAlign="right"
          >
            15 phút
          </Text>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={"Leave room"}
        titleButton={"Leave"}
        handleOnSubmit={() => {
          leaveRoom(room.roomId);
          onClose();
        }}
      >
        <Text fontSize="xl" fontWeight="600">
          Are you sure leave room {room.name}
        </Text>
      </ModalComponent>
    </RoomDetail>
  );
}

const RoomDetail = styled.div`
  div.active {
    background-color: #edf2f7;
  }
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { BiSearch } from "react-icons/bi";
import { MdGroupAdd } from "react-icons/md";
import Room from "./Room";

export interface IListRoomProps {}

export default function ListRoom(props: IListRoomProps) {
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
          label="Add new chat"
          aria-label="New chat tooltip"
          placement="top"
        >
          <IconButton
            colorScheme="teal"
            aria-label="New chat"
            icon={<MdGroupAdd />}
            ml={3}
          />
        </Tooltip>
      </InputGroup>

      <List
        spacing={3}
        textAlign="start"
        style={{ overflow: "auto" }}
        maxH={"90%"}
        mt={"20px"}
      >
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
        <Room />
      </List>
    </Box>
  );
}

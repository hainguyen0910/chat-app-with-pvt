import {
  Box,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";

export interface IInfoBarProps {
  roomName: string;
}

export default function InfoBar(props: IInfoBarProps) {
  const { roomName } = props;
  return (
    <Stack>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <Icon as={RiMastodonLine} color="green.500" />
          <Text fontSize="2xl" fontWeight="900" ml={3}>
            {roomName}
            {/* Room name */}
          </Text>
        </Flex>
        <Icon
          as={BsCameraVideoFill}
          color="green.500"
          w={6}
          h={6}
          ml={3}
          style={{ cursor: "pointer" }}
        />
      </Flex>
      <Divider
        orientation="horizontal"
        borderColor={useColorModeValue("gray.300", "gray.700")}
      />
    </Stack>
  );
}

import { Flex, Icon, Text } from "@chakra-ui/react";
import * as React from "react";
import { RiMastodonLine } from "react-icons/ri";
import { BsCameraVideoFill } from "react-icons/bs";

export interface IInfoBarProps {}

export default function InfoBar(props: IInfoBarProps) {
  return (
    <Flex align="center" justify="space-between">
      <Flex align="center">
        <Icon as={RiMastodonLine} color="green.500" />
        <Text fontSize="2xl" fontWeight="900" ml={3}>
          Room name
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
  );
}

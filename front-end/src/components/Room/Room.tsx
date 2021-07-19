import { Avatar, Box, Flex } from "@chakra-ui/react";
import * as React from "react";

export interface IRoomProps {}

export default function Room(props: IRoomProps) {
  return (
    <Flex align={"center"}>
      <Avatar
        size={"sm"}
        // src={item.avatar}
        alt={"Author"}
        css={{
          border: "2px solid white",
        }}
      />
      <Box as="a" color="teal.400" href="#" fontWeight="bold" ml={3}>
        {/* {item.fullname} */}
        Room name
      </Box>
    </Flex>
  );
}

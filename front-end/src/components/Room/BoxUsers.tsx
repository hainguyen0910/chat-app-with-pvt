import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
export interface IBoxInfoProps {
  titleBox: string;
}

export default function BoxInfo(props: IBoxInfoProps) {
  const { titleBox } = props;
  const roomReducer = JSON.parse(localStorage.getItem("currentRoom"));

  return (
    <Box
      py={4}
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={["1", "2", "3", "3"]}
    >
      <Heading fontSize={["sm", "md", "md", "xl"]}>{titleBox}</Heading>
      <Box py={4} px={12}>
        <HStack justifyContent="center">
          <Text fontSize={["sm", "md", "md", "xl"]} color="gray.500">
            Total
          </Text>
          <Text
            fontSize={["sm", "md", "3xl"]}
            fontWeight={["500", "500", "500", "900"]}
          >
            {/* {roomReducer.members.length} */}1
          </Text>
        </HStack>
      </Box>
      <List
        spacing={3}
        textAlign="start"
        style={{ overflow: "auto" }}
        maxH={"50vh"}
      >
        {/* {roomReducer.members.map((item: any, index: any) => (
          <ListItem minW={"200px"} key={index}>
            <Flex align={"center"}>
              <Avatar
                size={"sm"}
                src={item.avatar}
                alt={"Author"}
                css={{
                  border: "2px solid white",
                }}
              />
              <Box as="a" color="teal.400" href="#" fontWeight="bold" ml={3}>
                {item.fullname}
              </Box>
            </Flex>
          </ListItem>
        ))} */}
        <ListItem minW={"200px"}>
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
              name
            </Box>
          </Flex>
        </ListItem>
      </List>
    </Box>
  );
}

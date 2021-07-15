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
      p={8}
    >
      <Heading as="h2" size="xl">
        {titleBox}
      </Heading>
      <Box py={4} px={12}>
        <HStack justifyContent="center">
          <Text fontSize="3xl" color="gray.500">
            Total
          </Text>
          <Text fontSize="5xl" fontWeight="900">
            {roomReducer.members.length}
          </Text>
        </HStack>
      </Box>
      <VStack>
        <List
          spacing={3}
          textAlign="start"
          px={12}
          style={{ overflow: "auto" }}
          maxH={"50vh"}
        >
          {roomReducer.members.map((item: any, index: any) => (
            <ListItem minW={"200px"} key={index}>
              <Flex align={"center"}>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                  }
                  alt={"Author"}
                  css={{
                    border: "2px solid white",
                  }}
                />
                <Box as="a" color="teal.400" href="#" fontWeight="bold" ml={3}>
                  {item}
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
}

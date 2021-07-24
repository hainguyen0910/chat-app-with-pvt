import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
export interface IBoxInfoProps {
  titleBox: string;
  room: any;
  disabled: boolean;
}

export default function BoxInfo(props: IBoxInfoProps) {
  const { titleBox, room, disabled } = props;

  return (
    <Box
      py={4}
      borderBottomRadius={"xl"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={["1", "2", "3", "3"]}
    >
      {disabled ? (
        <Center mt={8} h={"90%"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        </Center>
      ) : (
        <>
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
                {room.members.length}
              </Text>
            </HStack>
          </Box>
          <List
            spacing={3}
            textAlign="start"
            style={{ overflow: "auto" }}
            maxH={"49vh"}
          >
            {room.members.map((item: any, index: any) => (
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
                  <Box
                    as="a"
                    color="teal.400"
                    href="#"
                    fontWeight="bold"
                    ml={3}
                  >
                    {item.fullname}
                  </Box>
                </Flex>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
}

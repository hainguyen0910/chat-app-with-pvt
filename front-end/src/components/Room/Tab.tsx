import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { history } from "App";
import * as React from "react";
export interface TabProps {
  titleForm: string;
  subTitle: string;
  nameButton: string;
  setTitleForm: (title: string) => void;
  setSubTitle: (title: string) => void;
  setNameButton: (title: string) => void;
  isLoading: boolean;
  setIsLoading: {
    on: () => void;
    off: () => void;
  };
}

export default function TabComponent(props: TabProps) {
  const {
    subTitle,
    titleForm,
    nameButton,
    setTitleForm,
    setSubTitle,
    setNameButton,
    isLoading,
    setIsLoading,
  } = props;

  const handleOnClickForm = (type: string): void => {
    if (type === "join") {
      setTitleForm("Join room");
      setSubTitle("To join room and chat, please enter the code room");
      setNameButton("join");
    } else {
      setTitleForm("Create room");
      setSubTitle("To create room and chat, please click here!");
      setNameButton("Create");
    }
  };

  const handleOnSubmitJoinRoom = (id: string) => {
    history.push(`/room/${id}`);
  };

  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
    >
      <Stack align={"center"} my={3}>
        <Heading fontSize={"4xl"}>{titleForm}</Heading>
        <Text fontSize={"lg"} color={"gray.600"} textAlign="center">
          {subTitle}{" "}
        </Text>
      </Stack>
      <Tabs variant="unstyled">
        <TabList>
          <Tab
            _selected={{ color: "white", bg: "blue.500" }}
            onClick={() => handleOnClickForm("join")}
          >
            Join
          </Tab>
          <Tab
            _selected={{ color: "white", bg: "green.400" }}
            onClick={() => handleOnClickForm("create")}
          >
            Create
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl id="room_code">
              <Input
                placeholder="Room code"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Center mt={3}>
                <Button
                  isLoading={isLoading}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  // onClick={() => {
                  //   if (isLoading) setIsLoading.off();
                  //   else setIsLoading.on();
                  // }}
                  onClick={() => handleOnSubmitJoinRoom("123")}
                >
                  {nameButton}
                </Button>
              </Center>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl id="room_name">
              <Input
                placeholder="Room name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Center mt={3}>
                <Button
                  isLoading={isLoading}
                  color={"white"}
                  bg={"green.400"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => {
                    if (isLoading) setIsLoading.off();
                    else setIsLoading.on();
                  }}
                >
                  {nameButton}
                </Button>
              </Center>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

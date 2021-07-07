import {
  Box,
  Center,
  Container,
  Flex,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import { AppProvider } from "App";
import CardComponent from "components/Room/Card";
import TabComponent from "components/Room/Tab";
import React, { useContext, useState } from "react";

interface loadingInterface {
  isLoading: boolean;
  setIsLoading: {
    on: () => void;
    off: () => void;
  };
}

export default function Home() {
  const loading: loadingInterface = useContext(AppProvider);
  const { isLoading, setIsLoading } = loading;

  const [titleForm, setTitleForm] = useState("Join room");
  const [subTitle, setSubTitle] = useState(
    "To join room and chat, please enter the code room"
  );
  const [nameButton, setNameButton] = useState("Join");

  const handleSubmitEditProfile = () => {
    console.log("submited");
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Stack direction={"row"} spacing={6}>
          <Tabs variant="enclosed" isFitted>
            <Center>
              <TabList>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>Room</Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>
                  Profile
                </Tab>
              </TabList>
            </Center>
            <TabPanels>
              <TabPanel>
                <Flex
                  minH={"89.3vh"}
                  align={"center"}
                  justify={"center"}
                  bg={useColorModeValue("gray.50", "gray.800")}
                >
                  <Stack
                    spacing={8}
                    mx={"auto"}
                    maxW={"lg"}
                    py={12}
                    px={6}
                    width={"30vw"}
                  >
                    <TabComponent
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      titleForm={titleForm}
                      setTitleForm={setTitleForm}
                      subTitle={subTitle}
                      setSubTitle={setSubTitle}
                      nameButton={nameButton}
                      setNameButton={setNameButton}
                    />
                  </Stack>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Center py={6} minH={"89.3vh"}>
                  <CardComponent
                    typeButton="edit"
                    handleOnSubmit={handleSubmitEditProfile}
                  />
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}

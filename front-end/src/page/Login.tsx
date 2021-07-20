import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { history } from "App";
import ModalComponent from "components/Modal/Modal";
import { AuthContext } from "contexts/auth/auth.context";
import React, { useState } from "react";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

interface loginContextInterface {
  authReducer: object;
  setAuthReducer: (state: any) => void;
  login: (username: string, password: string) => void;
}

export default function JoinOurTeam() {
  if (JSON.parse(localStorage.getItem("auth") || "{}")?.token) {
    history.push("/");
  }

  const loginContext: loginContextInterface = React.useContext(AuthContext);
  const { authReducer, setAuthReducer, login, register } = loginContext;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [fullname, setFullname] = useState("");
  const handleSignUp = (
    usernameSignUp: string,
    passwordSignUp: string,
    fullname: string
  ) => {
    register(usernameSignUp, passwordSignUp, fullname);
  };
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Chat app with PVT{" "}
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    bgGradient: "linear(to-bl, red.400,pink.400)",
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              width={useBreakpointValue({ base: "44px", md: "60px" })}
              height={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Join room and chat now
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              You want to create a room, enter the room and chat with your
              friends. Please login now or register yourself an account if you
              do not already have an account on our website!!!
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") login(username, password);
                }}
                placeholder="Password"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                onClick={() => login(username, password)}
              >
                Sign in
              </Button>
              <Button
                fontFamily={"heading"}
                bg={"gray.200"}
                color={"gray.800"}
                onClick={onOpen}
              >
                Sign up
              </Button>
            </Stack>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Sign up 😈"
        titleButton="Sign up"
        handleOnSubmit={() =>
          handleSignUp(usernameSignUp, passwordSignUp, fullname)
        }
      >
        <Flex
          //   minH={"100vh"}
          align={"center"}
          justify={"center"}
        >
          <Stack spacing={4}>
            <Input
              type="text"
              placeholder="Username"
              value={usernameSignUp}
              onChange={(e) => setUsernameSignUp(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={passwordSignUp}
              onChange={(e) => setPasswordSignUp(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Stack>
        </Flex>
      </ModalComponent>
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

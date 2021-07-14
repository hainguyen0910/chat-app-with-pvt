import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import * as React from "react";
import ModalComponent from "components/Modal";

export interface CardProps {
  typeButton: string;
  handleOnSubmit: () => void;
}

export default function CardComponent(props: CardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { typeButton } = props;
  return (
    <Box
      maxW={"270px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
    >
      <Image
        h={"120px"}
        w={"full"}
        src={
          "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        }
        objectFit={"cover"}
      />
      <Flex justify={"center"} mt={-12}>
        <Avatar
          size={"xl"}
          src={
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          }
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
        />
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            John Doe
          </Heading>
          <Text color={"gray.500"}>Feeling in love 🥰</Text>
        </Stack>

        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>Male</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Sex
            </Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>23</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              Age
            </Text>
          </Stack>
        </Stack>

        <Button
          w={"full"}
          mt={8}
          bg={useColorModeValue("#151f21", "gray.900")}
          color={"white"}
          rounded={"md"}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          onClick={onOpen}
        >
          {typeButton === "edit" ? "Edit profile" : "Add friend"}
        </Button>
      </Box>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Edit profile 😈"
        titleButton="Update"
        handleOnSubmit={() => console.log(1)}
      >
        <Flex
          //   minH={"100vh"}
          align={"center"}
          justify={"center"}
        >
          <Stack spacing={4}>
            <Input type="text" placeholder="Name" />
            <Select type="text">
              <option value="option1">Male</option>
              <option value="option2">Female</option>
              <option value="option3">Unknown</option>
            </Select>
            <Input type="number" placeholder="Age" />
          </Stack>
        </Flex>
      </ModalComponent>
    </Box>
  );
}

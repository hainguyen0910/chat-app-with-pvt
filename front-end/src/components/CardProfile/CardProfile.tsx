import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";

interface CardProps {
  typeButton: string;
  user: any;
  fileUpload: any;
  setFileUpload: any;
  isMobile: boolean;
  setUserMobile: any;
}

export default function CardComponent(props: CardProps) {
  const { typeButton, user, setFileUpload, isMobile, setUserMobile } = props;
  const [imgAvatar, setImgAvatar] = React.useState(user?.avatar);
  const [isEdit, setIsEdit] = React.useState(false);

  const fileInputRef = React.useRef();
  const handleOnChange = (e: any) => {
    setFileUpload(e.target.files[0]);
    setImgAvatar(URL.createObjectURL(e.target.files[0]));
  };

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
          src={imgAvatar ? imgAvatar : user?.avatar}
          alt={"Author"}
          css={{
            border: "2px solid white",
          }}
        ></Avatar>
      </Flex>

      <Box p={6}>
        <Stack spacing={0} align={"center"} mb={5}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {isMobile && isEdit ? (
              <Input
                value={user?.fullname}
                onChange={(e) =>
                  setUserMobile({ ...user, fullname: e.target.value })
                }
              />
            ) : (
              user?.fullname
            )}
          </Heading>
          <Text color={"gray.500"}>
            {isMobile && isEdit ? (
              <Input value={"Are you oke?"} mt={3} />
            ) : user?.status ? (
              user?.status
            ) : (
              "Are you oke?"
            )}
          </Text>
        </Stack>

        <Stack direction={"row"} justify={"center"} spacing={6}>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>Sex</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              {isMobile && isEdit ? (
                <Select
                  w="8rem"
                  value={user?.sex}
                  onChange={(e) =>
                    setUserMobile({ ...user, sex: e.target.value })
                  }
                >
                  <option value="male" selected={user?.sex && true}>
                    Male
                  </option>
                  <option value="female" selected={user?.sex && true}>
                    Female
                  </option>
                  <option value="unknown" selected={user?.sex && true}>
                    Unknown
                  </option>
                </Select>
              ) : (
                user?.sex
              )}
            </Text>
          </Stack>
          <Stack spacing={0} align={"center"}>
            <Text fontWeight={600}>Age</Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              {isMobile && isEdit ? (
                <Input
                  value={user?.age}
                  onChange={(e) =>
                    setUserMobile({ ...user, age: e.target.value })
                  }
                />
              ) : user?.age ? (
                user?.age
              ) : (
                "---"
              )}
            </Text>
          </Stack>
        </Stack>
        <Input
          type="file"
          id="file"
          display="none"
          ref={fileInputRef}
          onChange={handleOnChange}
          accept="image/x-png,image/gif,image/jpeg"
        />
        {isMobile && (
          <Button
            w={"full"}
            value="Upload"
            mt={2}
            mb={-6}
            variant="outline"
            color={"green"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            type="button"
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit
          </Button>
        )}

        {typeButton && (
          <Button
            w={"full"}
            value="Upload"
            mt={8}
            colorScheme={"green"}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            {typeButton}
          </Button>
        )}
      </Box>
    </Box>
  );
}

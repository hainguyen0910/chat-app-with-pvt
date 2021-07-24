import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { history } from "App";
import ModalComponent from "components/Modal/Modal";
import CardProfile from "components/CardProfile/CardProfile";
import { AuthContext } from "contexts/auth/auth.context";
import * as React from "react";
import { BiArrowBack } from "react-icons/bi";
import { isMobile } from "react-device-detect";
import { UserContext } from "contexts/user/user.context";

interface IHeaderProps {}

interface RoomContextInterface {
  updateProfile: (data: any) => void;
  changePassword: (
    { password, newPassword }: any,
    onClose: any,
    clearInputPassword: any
  ) => void;
  authReducer: any;
}

interface UserContextInterface {
  user: any;
  changePassword: any;
  updateProfile: any;
}

export default function Header(props: IHeaderProps) {
  const auth = React.useContext(AuthContext);
  const { authReducer, logout }: any = auth;

  const userContext: UserContextInterface = React.useContext(UserContext);
  const { user, changePassword, updateProfile } = userContext;
  const [userMobile, setUserMobile] = React.useState(user);

  const toast = useToast();

  const [fullname, setFullname] = React.useState(user?.fullname);
  const [sex, setSex] = React.useState(user?.sex);
  const [age, setAge] = React.useState(user?.age);
  const [status, setStatus] = React.useState("");
  const [fileUpload, setFileUpload] = React.useState(user?.avatar);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isChangePassword, setIsChangePassword] = React.useState(false);
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const clearInputPassword = () => {
    setOldPassword("");
    setNewPassword("");
  };

  const handleOnSubmit = (isChangePassword: boolean) => {
    if (isChangePassword) {
      if (oldPassword !== "" && newPassword !== "") {
        changePassword(
          { password: oldPassword, newPassword },
          onClose,
          clearInputPassword
        );
      } else {
        return toast({
          title: `Old password or new password is not allowed to be empty`,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }
    } else {
      const formData = new FormData();
      let check = 0;
      if (fullname !== user?.fullname) {
        formData.append("fullname", fullname);
        check += 1;
      }
      if (sex !== user?.sex) {
        formData.append("sex", sex);
        check += 1;
      }
      if (age !== user?.age) {
        formData.append("age", age);
        check += 1;
      }
      if (fileUpload !== user?.avatar) {
        formData.append("avatar", fileUpload);
        check += 1;
      }
      if (check !== 0) {
        updateProfile(formData);
        check = 0;
      }
    }
  };

  const handleMobileUpdateProfile = () => {
    const formData = new FormData();
    let check = 0;
    if (userMobile.fullname !== user?.fullname) {
      formData.append("fullname", userMobile.fullname);
      check += 1;
    }
    if (userMobile.sex !== user?.sex) {
      formData.append("sex", userMobile.sex);
      check += 1;
    }
    if (userMobile.age !== user?.age) {
      formData.append("age", userMobile.age);
      check += 1;
    }
    if (fileUpload !== user?.avatar) {
      formData.append("avatar", fileUpload);
      check += 1;
    }
    if (check !== 0) {
      updateProfile(formData);
      check = 0;
    }
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      p={2}
      px={5}
      borderBottomWidth={2}
      borderBottomColor={"white"}
      h={"10vh"}
      bg={useColorModeValue("gray.300", "gray.900")}
    >
      <Icon
        as={BiArrowBack}
        color="gray.500"
        w={0}
        h={0}
        ml={3}
        style={{ cursor: "pointer" }}
        onClick={() => history.goBack()}
      />
      <Text
        fontSize={["1xl", "2xl", "2xl", "5xl"]}
        fontWeight="900"
        color={"gray"}
      >
        PVT CHAT
      </Text>
      <Menu>
        <MenuButton>
          <Avatar
            size={"md"}
            src={user?.avatar}
            alt={"Avatar"}
            css={{
              border: "2px solid white",
            }}
            cursor={"pointer"}
          />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem
              onClick={() => {
                setIsChangePassword(false);
                onOpen();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsChangePassword(true);
                onOpen();
              }}
            >
              Change password
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={isChangePassword ? "Change password 😈" : "Profile 😈"}
        titleButton={isChangePassword ? "Update" : "Update"}
        handleOnSubmit={() => {
          if (isMobile) {
            handleMobileUpdateProfile();
          } else {
            handleOnSubmit(isChangePassword);
          }
        }}
        size={isChangePassword ? "xl" : "5xl"}
      >
        {isChangePassword ? (
          <Stack ml={8} mt={5} space={2}>
            <FormControl id="old-password" isRequired>
              <FormLabel>Old password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Old password"
                  w={"full"}
                  value={oldPassword}
                  onChange={(e) =>
                    setOldPassword(e.target.value.replace(/\s+/g, ""))
                  }
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="new-password" isRequired>
              <FormLabel>New password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="New password"
                  w={"full"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value.replace(/\s+/g, ""));
                    console.log(e.target.value.replace(/\s+/g, ""));
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
        ) : (
          <Flex
            flexDir={["column", "column", "row", "row"]}
            alignItems="center"
          >
            {isMobile ? (
              <>
                <CardProfile
                  typeButton="Upload Avatar"
                  user={userMobile}
                  fileUpload={fileUpload}
                  setFileUpload={setFileUpload}
                  isMobile={true}
                  setUserMobile={setUserMobile}
                />
              </>
            ) : (
              <>
                <CardProfile
                  typeButton="Upload Avatar"
                  user={user}
                  fileUpload={fileUpload}
                  setFileUpload={setFileUpload}
                />
                <Stack ml={8} mt={5} space={2}>
                  <FormControl id="fullname" isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input
                      placeholder="Full name"
                      w={["xs", "xs", "xl", "xl"]}
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="sex">
                    <FormLabel>Sex</FormLabel>
                    <Select
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                    >
                      <option value="male" selected={sex && true}>
                        Male
                      </option>
                      <option value="female" selected={sex && true}>
                        Female
                      </option>
                      <option value="unknown" selected={sex && true}>
                        Unknown
                      </option>
                    </Select>
                  </FormControl>
                  <FormControl id="age">
                    <FormLabel>Age</FormLabel>
                    <Input
                      placeholder="Age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id="status">
                    <FormLabel>Status (Maximum 20 character)</FormLabel>
                    <Textarea
                      placeholder="What are you thinking?"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </FormControl>
                </Stack>
              </>
            )}
          </Flex>
        )}
      </ModalComponent>
    </Flex>
  );
}

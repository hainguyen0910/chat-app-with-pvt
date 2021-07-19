import {
  Avatar,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import { history } from "App";
import { AuthContext } from "contexts/auth/auth.context";
import * as React from "react";
import { BiArrowBack } from "react-icons/bi";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const auth = React.useContext(AuthContext);
  const { authReducer, logout } = auth;

  return (
    <Flex
      justify="space-between"
      align="center"
      p={2}
      px={5}
      borderBottomWidth={2}
      borderBottomColor={"white"}
      h={"10vh"}
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
            src={authReducer.avatar}
            alt={"Avatar"}
            css={{
              border: "2px solid white",
            }}
            cursor={"pointer"}
          />
        </MenuButton>
        <Portal>
          <MenuList>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Flex>
  );
}

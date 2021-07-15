import * as React from "react";
import {
  Box,
  Center,
  Flex,
  useColorModeValue,
  Icon,
  Text,
  Avatar,
  Menu,
  MenuButton,
  Portal,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { history } from "App";
import { AuthContext } from "contexts/auth/auth.context";

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const auth = React.useContext(AuthContext);
  const { logout } = auth;

  return (
    <Flex
      justify="space-between"
      align="center"
      p={2}
      px={5}
      borderBottomWidth={2}
      borderBottomColor={"white"}
    >
      <Icon
        as={BiArrowBack}
        color="gray.500"
        w={6}
        h={6}
        ml={3}
        style={{ cursor: "pointer" }}
        onClick={() => history.goBack()}
      />
      <Text fontSize="5xl" fontWeight="900" color={"gray"}>
        PVT CHAT
      </Text>
      <Menu>
        <MenuButton>
          <Avatar
            size={"md"}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt={"Author"}
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

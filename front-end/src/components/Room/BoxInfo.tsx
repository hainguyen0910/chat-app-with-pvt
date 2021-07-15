import {
  Box,
  Heading,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
export interface IBoxInfoProps {
  titleBox: string;
}

export default function BoxInfo(props: IBoxInfoProps) {
  const { titleBox } = props;
  return (
    <Box
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
            ID
          </Text>
          <Text fontSize="5xl" fontWeight="900">
            79123
          </Text>
        </HStack>
      </Box>
      <VStack>
        <List spacing={3} textAlign="start" px={12}>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            Private
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            Host: Tao ne`
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="green.500" />
            Create at: 10:00 25/07/2021
          </ListItem>
        </List>
      </VStack>
    </Box>
  );
}
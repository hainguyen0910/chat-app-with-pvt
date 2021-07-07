import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  modalTitle: string;
}

export default function ModalComponent(props: ModalProps) {
  const { isOpen, onClose, modalTitle, children } = props;
  return (
    <Modal
      isCentered={true}
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Close
          </Button>
          <Button colorScheme="blue">Update</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

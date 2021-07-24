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
  titleButton: string;
  handleOnSubmit: () => void;
  size: string;
}

export default function ModalComponent(props: ModalProps) {
  const {
    isOpen,
    onClose,
    modalTitle,
    children,
    titleButton,
    handleOnSubmit,
    size,
  } = props;
  return (
    <Modal
      isCentered={true}
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size={size}
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
          <Button colorScheme={"green"} onClick={handleOnSubmit}>
            {titleButton}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

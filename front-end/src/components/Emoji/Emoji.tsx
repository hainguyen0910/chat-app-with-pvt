import styled from "@emotion/styled";
import * as React from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { Box } from "@chakra-ui/react";

export interface IEmojiProps {
  isShowEmoji: boolean;
  message: any;
  setMessage: any;
  inputRef: any;
  setCursorPosition: any;
}

export default function Emoji(props: IEmojiProps) {
  const { isShowEmoji, message, setMessage, inputRef, setCursorPosition } =
    props;

  const onEmojiClick = (event: any, { emoji }: any) => {
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);
    const text = start + emoji + end;
    setMessage(text);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <EmojiContainer isShowEmoji={isShowEmoji}>
      <Picker onEmojiClick={onEmojiClick} disableSearchBar />
    </EmojiContainer>
  );
}

const EmojiContainer = styled(Box)`
  aside.emoji-picker-react {
    position: absolute;
    top: -20rem;
    bottom: 0;
    right: -5rem;
  }

  display: ${(props) => (props.isShowEmoji ? "block" : "none")};
`;

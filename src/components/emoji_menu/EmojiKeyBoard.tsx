import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import * as React from "react";
import { emojiMenuStyles } from "./EmojiMenuStyles";

interface IProps {
  value: string;
  setValue: (value: string) => void;
}

const EmojiKeyBoard = ({ value, setValue }: IProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const emojiClickHandler = (event: EmojiClickData) => {
    setValue(value + event.emoji);
    handleClose();
  };
  return (
    <React.Fragment>
      <Box sx={emojiMenuStyles.mainContainer}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <SentimentSatisfiedAltIcon />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        sx={emojiMenuStyles.menu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <EmojiPicker onEmojiClick={emojiClickHandler} />
      </Menu>
    </React.Fragment>
  );
};

export default EmojiKeyBoard;

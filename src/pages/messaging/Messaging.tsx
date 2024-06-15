import { StarBorder } from "@mui/icons-material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import GifIcon from "@mui/icons-material/Gif";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import VideocamIcon from "@mui/icons-material/Videocam";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import OtherUserPic from "../../assets/images/dummyUser.jpeg";

import AttachmentIcon from "@mui/icons-material/Attachment";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "../../components/card_with_image/CardWithImageStyles";
import ModalToolTip from "../../components/custom_tool_tip/ModalToolTip";
import EmojiKeyBoard from "../../components/emoji_menu/EmojiKeyBoard";
import { db } from "../../firebase/config";
import {
  gettingMessages,
  sendingMessage,
  settingActiveChatUser,
} from "../../redux/features/UsersSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import { EachMessage, EachUser } from "../../types/GlobalTypes";
import { homeStyles } from "../home/HomeStyles";
import { messageStyles } from "./MessagingStyles";

interface IState {
  activeTab: "FOCUS" | "OTHERS";
  activeUserIndex: number;
}

const modalBottomIcons = [
  {
    text: "Media",
    icon: <MovieIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Attachment",
    icon: <AttachmentIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Insert a GIF",
    icon: <GifIcon sx={homeStyles.modalBottomIcon} />,
  },
];

const Messaging = () => {
  const [activeTab, setActiveTab] = useState<IState["activeTab"]>("FOCUS");
  const [messageText, setMessageText] = useState<string>("");
  const allUsers = useSelector((state: RootState) => state.usersReducer.users);
  const boxRef = useRef<HTMLDivElement>(null);
  const activeUser = useSelector(
    (state: RootState) => state.usersReducer.activeUser
  );
  const activeChatWith = useSelector(
    (state: RootState) => state.usersReducer.activeChatWith
  );
  const activeChatHistory = useSelector(
    (state: RootState) => state.usersReducer.activeChatHistory
  );
  const otherUsers = allUsers.filter((user) => user.id !== activeUser?.id);
  const activeChatUser = allUsers.filter(
    (each) => each.id === activeChatWith
  )[0];
  const allMessages = useSelector(
    (state: RootState) => state.usersReducer.allMessages
  );
  const dispatch = useDispatch<AppDispatch>();

  const messageTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  const switchingActiveChatUser = (newActiveChatUserId: EachUser["id"]) => {
    dispatch(settingActiveChatUser(newActiveChatUserId));
    dispatch(gettingMessages());
  };
  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [activeChatHistory]);

  useEffect(() => {
    const q = query(collection(db, "messages"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length > allMessages.length) {
        dispatch(gettingMessages());
      }
    });
    return () => unsub();
  }, []);
  const activeTabHandler = (tab: "FOCUS" | "OTHERS") => setActiveTab(tab);
  const sendMessageHandler = () => {
    const newMessage: EachMessage = {
      messageId: Math.ceil(Math.random() * 1000000000000),
      senderId: activeUser?.id ?? "",
      receiverId: activeChatWith ?? "",
      text: messageText,
      time: new Date().toLocaleTimeString(),
    };
    dispatch(sendingMessage(newMessage));
    dispatch(gettingMessages());
    setMessageText("");
  };

  return (
    <Box sx={homeStyles.bgContainer}>
      <Box maxWidth="1100px" width="98vw">
        <Grid container>
          <Grid item xs={12} md={3}>
            <Stack bgcolor={"white"} py={2}>
              <Stack direction={"row"} justifyContent={"space-between"} p={1}>
                <Typography variant="body1">Messaging</Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <MoreHorizIcon />
                  <EditCalendarIcon />
                </Stack>
              </Stack>
              <Divider sx={homeStyles.dividerStyling} />
              <TextField
                size="small"
                sx={messageStyles.searchField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <TuneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction={"row"} px={1} justifyContent={"space-between"}>
                <Button
                  sx={
                    activeTab === "FOCUS"
                      ? messageStyles.activeTabButton
                      : messageStyles.inActiveTabButton
                  }
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={() => activeTabHandler("FOCUS")}
                >
                  Focused
                </Button>
                <Button
                  sx={
                    activeTab === "OTHERS"
                      ? messageStyles.activeTabButton
                      : messageStyles.inActiveTabButton
                  }
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  onClick={() => activeTabHandler("OTHERS")}
                >
                  Other
                </Button>
              </Stack>
              <Stack my={2}>
                {otherUsers.map((user) => (
                  <Stack
                    key={user.id}
                    sx={
                      activeChatWith === user.id
                        ? messageStyles.activeChatUser
                        : messageStyles.inActiveChatUser
                    }
                    px={1}
                    direction={"row"}
                    alignItems={"center"}
                    onClick={() => switchingActiveChatUser(user.id)}
                  >
                    <Box
                      component={"img"}
                      src={OtherUserPic}
                      borderRadius={"50%"}
                      width={"50px"}
                    />
                    <Stack
                      ml={1}
                      borderBottom={"solid 0.5px"}
                      borderColor={"gray"}
                      py={2}
                    >
                      <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography fontWeight={"bold"} fontSize={"16px"}>
                          {user.userName}
                        </Typography>
                        <Typography>Feb 4</Typography>
                      </Stack>
                      <Typography fontSize={"14px"}>Latest Message</Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          {activeChatWith && (
            <Grid item xs={12} md={6}>
              <Stack bgcolor={"white"} py={1}>
                <Stack
                  direction={"row"}
                  px={1}
                  borderBottom={"solid 2px rgba(0,0,0,0.3)"}
                  alignItems={"center"}
                  width={"100%"}
                  justifyContent={"space-between"}
                  color={"gray"}
                >
                  <Stack>
                    <Typography color={"black"} fontWeight={"bold"}>
                      Active Chat User
                    </Typography>
                    <Typography fontSize={"14px"}>
                      Active Chat User Position
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={1}
                    width={"fit-content"}
                    justifyContent={"end"}
                    alignItems={"flex-start"}
                  >
                    <MoreHorizIcon />
                    <VideocamIcon />
                    <StarBorder />
                  </Stack>
                </Stack>
                <Stack
                  px={2}
                  my={2}
                  pb={2}
                  borderBottom={"solid 2px rgba(0,0,0,0.1)"}
                >
                  <Box
                    component={"img"}
                    src={OtherUserPic}
                    borderRadius={"50%"}
                    width={"75px"}
                  />
                  <Typography fontSize={"18px"} fontWeight={"bold"}>
                    {activeChatUser?.userName ?? "active Chat User"}
                  </Typography>
                  <Typography fontSize={"14px"}>
                    {activeChatUser?.email ?? "active Chat Email"}
                  </Typography>
                </Stack>
                {/* messages Container */}
                <Stack
                  height={"350px"}
                  overflow={"auto"}
                  borderBottom={"solid 2px rgba(0,0,0,0.3)"}
                  ref={boxRef}
                >
                  {activeChatHistory.map((each, index: number) => {
                    const userName =
                      each.senderId === activeUser?.id
                        ? activeUser.userName
                        : activeChatUser.userName;
                    return (
                      <Stack
                        px={1}
                        direction={"row"}
                        alignItems={"center"}
                        key={index}
                      >
                        <Box
                          component={"img"}
                          src={OtherUserPic}
                          borderRadius={"50%"}
                          width={"50px"}
                        />
                        <Stack ml={1} py={2}>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <Typography fontWeight={"bold"} fontSize={"16px"}>
                              {userName}
                            </Typography>
                            <Typography>time</Typography>
                          </Stack>
                          <Typography fontSize={"14px"}>{each.text}</Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                </Stack>
                <Box p={2} borderBottom={"solid 2px rgba(0,0,0,0.3)"}>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    sx={messageStyles.messageTextBox}
                    onChange={messageTextHandler}
                    value={messageText}
                    placeholder="Write a message..."
                  />
                </Box>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  px={2}
                >
                  <Stack direction={"row"}>
                    {modalBottomIcons.map((item, index) => (
                      <ModalToolTip
                        key={index}
                        Icon=<IconButton>{item.icon}</IconButton>
                        text={item.text}
                      />
                    ))}
                    <EmojiKeyBoard
                      value={messageText}
                      setValue={setMessageText}
                    />
                  </Stack>
                  <Stack direction={"row"} mt={2} spacing={2}>
                    <Button
                      variant="contained"
                      sx={styles.commentPostButton}
                      disabled={messageText.length === 0}
                      onClick={sendMessageHandler}
                    >
                      Send
                    </Button>
                    <MoreHorizIcon sx={homeStyles.customGrayColor} />
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Messaging;

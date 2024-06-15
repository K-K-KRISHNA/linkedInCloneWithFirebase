import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MovieIcon from "@mui/icons-material/Movie";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NoteIcon from "@mui/icons-material/Note";
import PollIcon from "@mui/icons-material/Poll";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CgUserAdd } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LinkedInLogo from "../../assets/images/aahlc8ivbnmk0t3eyz8as5gvr.svg";
import CompanyLogo from "../../assets/images/companylogo.jpeg";
import ProfilePic from "../../assets/images/myImage.jpeg";
import CardWithImage from "../../components/card_with_image/CardWithImage";
import ModalToolTip from "../../components/custom_tool_tip/ModalToolTip";
import EmojiKeyBoard from "../../components/emoji_menu/EmojiKeyBoard";
import NavBar from "../../components/navbar/NavBar";
import { db } from "../../firebase/config";
import {
  gettingAllUsers,
  gettingPosts,
  posting,
} from "../../redux/features/UsersSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import { EachPost } from "../../types/GlobalTypes";
import { homeStyles } from "./HomeStyles";
interface IState {
  isShowMoreEnabled: boolean;
  postModalOpen: boolean;
  postText: string;
  postModalMoreIconOpen: boolean;
}

const modalBottomIcons = [
  {
    text: "Media",
    icon: <MovieIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Create an event",
    icon: <CalendarMonthIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Celebrate an occasion",
    icon: <CelebrationIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Share that you're hiring",
    icon: <BusinessCenterIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Create a poll",
    icon: <PollIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Add a document",
    icon: <NoteIcon sx={homeStyles.modalBottomIcon} />,
  },
  {
    text: "Find an Expert",
    icon: <DirectionsWalkIcon sx={homeStyles.modalBottomIcon} />,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [isShowMoreEnabled, setIsShowMoreEnabled] =
    useState<IState["isShowMoreEnabled"]>(false);

  const [postModalOpen, setPostModalOpen] =
    useState<IState["postModalOpen"]>(false);
  const [postText, setPostText] = useState<IState["postText"]>("");
  const [postModalMoreIconOpen, setPostModalMoreIconOpen] =
    useState<IState["postModalMoreIconOpen"]>(false);
  const activeUser = useSelector(
    (state: RootState) => state.usersReducer.activeUser
  );
  const dispatch = useDispatch<AppDispatch>();
  const allPosts = useSelector((state: RootState) => state.usersReducer.posts);

  const renderingShowMoreIcon = () =>
    isShowMoreEnabled ? <ExpandLessIcon /> : <ExpandMoreIcon />;

  const showMoreHandler = () => setIsShowMoreEnabled((prev) => !prev);
  const postModalCloser = () => {
    setPostModalOpen(false);
    setPostText("");
  };
  const startPostClickHandler = () => {
    setPostModalOpen(true);
  };
  const postTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const postModalMoreIconOpenHandler = () => {
    setPostModalMoreIconOpen((prev) => !prev);
  };

  const renderPostModalBottomIcons = () => {
    if (postModalMoreIconOpen) {
      return modalBottomIcons.map((each, index) => (
        <ModalToolTip text={each.text} Icon={each.icon} key={index} />
      ));
    } else {
      return modalBottomIcons
        .slice(0, 3)
        .map((each, index) => (
          <ModalToolTip text={each.text} Icon={each.icon} key={index} />
        ));
    }
  };

  const postHandler = () => {
    const newPost: EachPost = {
      postedBy: activeUser?.id ?? "",
      postId: Math.ceil(Math.random() * 100000),
      text: postText,
      likes: [],
      comments: [],
      time: new Date().toLocaleString(),
    };
    dispatch(posting(newPost));
    dispatch(gettingPosts());
  };

  useEffect(() => {
    dispatch(gettingAllUsers());
    dispatch(gettingPosts());
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, () => {
      dispatch(gettingAllUsers());
      dispatch(gettingPosts());
    });
    return () => unsub();
  }, []);

  if (localStorage.getItem("activeUser") === null) {
    navigate("/auth");
  }

  return (
    <>
      <NavBar />
      <Box sx={homeStyles.bgContainer}>
        <Box maxWidth="1100px" width="98vw">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={2.75}>
              <Box sx={homeStyles.profileDetailsBg}>
                <Box sx={homeStyles.profileDetailsContainer}>
                  <Box
                    component={"img"}
                    src={ProfilePic}
                    sx={homeStyles.profilePicSizing}
                    alt="profilePic"
                  />
                  <Typography
                    fontWeight={"bold"}
                    textAlign={"center"}
                    fontSize={"14px"}
                  >
                    {activeUser?.userName}
                  </Typography>
                  <Typography variant="body1" mb={2} fontSize={"12px"}>
                    {activeUser?.email}
                  </Typography>
                  <Divider sx={homeStyles.dividerStyling} />
                  <Stack
                    direction="row"
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={1}
                    my={1}
                    sx={homeStyles.connectionsContainer}
                    alignSelf={"flex-start"}
                  >
                    <Box>
                      <Typography sx={homeStyles.connectionsText}>
                        Connections
                      </Typography>
                      <Typography sx={homeStyles.growNetworkText}>
                        Grow your network
                      </Typography>
                    </Box>
                    <CgUserAdd />
                  </Stack>
                  <Divider sx={homeStyles.dividerStyling} />
                  <Box sx={homeStyles.aiAssistingText}>
                    <Typography fontSize={"13px"} color={"rgba(0,0,0,0.7)"}>
                      Strengthen your profile with an AI writing assistant
                    </Typography>
                    <Stack
                      direction={"row"}
                      fontSize={"11px"}
                      alignItems={"center"}
                    >
                      <TextSnippetIcon
                        sx={homeStyles.premiumIcon}
                        color="warning"
                      />
                      <Typography
                        fontSize={"13px"}
                        fontWeight={"bold"}
                        color={"black"}
                      >
                        Try Premium for ₹0
                      </Typography>
                    </Stack>
                  </Box>
                  <Divider sx={homeStyles.dividerStyling} />
                  <Box
                    sx={homeStyles.aiAssistingText}
                    width="100%"
                    alignSelf={"flex-start"}
                  >
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      fontSize={"15px"}
                      spacing={1}
                      color={"black"}
                      justifyContent={"flex-start"}
                    >
                      <BookmarkIcon
                        fontSize="inherit"
                        sx={homeStyles.customGrayColor}
                      />
                      <Typography
                        fontSize={"inherit"}
                        color={"rgba(0,0,0,0.9)"}
                        fontWeight={"bold"}
                      >
                        My items
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
              <Stack
                mt={1}
                bgcolor={"white"}
                borderRadius={"10px"}
                border="solid 1px rgb(236,231,225)"
                color={"blue"}
                fontSize={"10px"}
              >
                <Stack
                  direction={"row"}
                  py={1}
                  mx={1}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Stack spacing={2} color={"rgb(10,102,194)"}>
                    <Typography fontSize={"inherit"} fontWeight={"bold"}>
                      Groups
                    </Typography>
                    <Typography fontSize={"inherit"} fontWeight={"bold"}>
                      Events
                    </Typography>
                    <Typography fontSize={"inherit"} fontWeight={"bold"}>
                      Followed Hashtags
                    </Typography>
                  </Stack>
                  <IconButton sx={homeStyles.plusButton}>
                    <AddIcon />
                  </IconButton>
                </Stack>
                <Divider sx={homeStyles.dividerStyling} />
                <Stack justifyContent={"center"} p={1} direction={"row"}>
                  <Typography
                    fontWeight={"bolder"}
                    fontSize={"14px"}
                    color={"rgba(0,0,0,0.8)"}
                  >
                    Discover more
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={8} lg={5.75}>
              <Stack
                bgcolor={"white"}
                border="solid 1px rgb(236,231,225)"
                borderRadius={"10px"}
                p={1}
                pt={2}
                spacing={2}
              >
                <Stack direction={"row"} spacing={2}>
                  <Box
                    component={"img"}
                    src={ProfilePic}
                    width={50}
                    borderRadius={"50%"}
                  />
                  <Typography
                    sx={homeStyles.postText}
                    onClick={startPostClickHandler}
                  >
                    Start a post
                  </Typography>
                </Stack>
                <Box
                  component={"input"}
                  type="file"
                  accept="image/*"
                  id="mediaUpload"
                  display={"none"}
                />
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"space-around"}
                  alignItems={"center"}
                >
                  <Button
                    component={"label"}
                    htmlFor="mediaUpload"
                    sx={homeStyles.postButtons}
                    startIcon={<CollectionsIcon color="primary" />}
                  >
                    Media
                  </Button>
                  <Button
                    sx={homeStyles.postButtons}
                    startIcon={<CalendarMonthIcon color="success" />}
                  >
                    Event
                  </Button>
                  <Button
                    sx={homeStyles.postButtons}
                    startIcon={<NewspaperIcon color="warning" />}
                  >
                    Write article
                  </Button>
                </Stack>
              </Stack>
              <Stack
                direction={"row-reverse"}
                alignItems={"center"}
                justifyContent={"center"}
                my={1}
                spacing={1}
              >
                <Typography
                  color={"gray"}
                  fontSize={"10px"}
                  width={"15%"}
                  sx={homeStyles.sortByText}
                >
                  Sort by:
                  <Box component={"span"} color={"black"} fontWeight={"bold"}>
                    Top
                  </Box>
                </Typography>
                <Divider sx={homeStyles.dividerWidth} />
              </Stack>
              <Stack spacing={1}>
                {allPosts.map((each, index: number) => (
                  <CardWithImage key={index} id={index + 1} data={each} />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} lg={3.5}>
              <Stack
                spacing={1}
                border={"solid 1px rgb(236,231,225)"}
                p={1}
                bgcolor={"white"}
                borderRadius={"10px"}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body1" fontWeight={"bold"}>
                    LinkedIn News
                  </Typography>
                  <HelpCenterIcon fontSize="small" />
                </Stack>
                <Box
                  component={"ul"}
                  sx={{
                    ...homeStyles.listContainer,
                    ...(isShowMoreEnabled ? { height: "505px" } : null),
                  }}
                >
                  {Array(11)
                    .fill(0)
                    .map((_each, index: number) => (
                      <Box component={"li"} key={index} my={1}>
                        <Typography variant="body2" fontWeight={"bold"}>
                          Paytm payments bank:update
                        </Typography>
                        <Typography
                          variant="body1"
                          fontSize={"12px"}
                          color={"gray"}
                        >
                          2d ago . 1,456 reader
                        </Typography>
                      </Box>
                    ))}
                </Box>
                <Button
                  variant="text"
                  endIcon={renderingShowMoreIcon()}
                  sx={homeStyles.showmoreBtn}
                  disableElevation
                  disableFocusRipple
                  disableTouchRipple
                  disableRipple
                  onClick={showMoreHandler}
                >
                  Show {isShowMoreEnabled ? "Less" : "More"}
                </Button>
              </Stack>
              <Stack position={"sticky"} top={"70px"}>
                <Stack
                  border={"solid 1px rgb(236,231,225)"}
                  p={1}
                  bgcolor={"white"}
                  borderRadius={"10px"}
                  spacing={2}
                  pb={3}
                  my={2}
                >
                  <Stack
                    direction={"row"}
                    alignSelf={"flex-end"}
                    spacing={1}
                    alignItems={"center"}
                  >
                    <Typography variant="body1" fontSize={"12px"}>
                      Ad
                    </Typography>
                    <MoreHorizIcon fontSize="small" />
                  </Stack>
                  <Typography
                    color={"gray"}
                    fontSize={"13px"}
                    textAlign={"center"}
                  >
                    You've got the skills, we've got the opportunities
                  </Typography>
                  <Stack
                    justifyContent={"center"}
                    direction={"row"}
                    spacing={1}
                  >
                    <Box
                      component={"img"}
                      src={ProfilePic}
                      alt="Profile"
                      width={70}
                      borderRadius={"50%"}
                    />
                    <Box />
                    <Box
                      component={"img"}
                      src={CompanyLogo}
                      alt="Company Logo"
                      width={70}
                    />
                    <Box />
                  </Stack>
                  <Typography
                    variant="body2"
                    textAlign={"center"}
                    color={"rgba(0,0,0,0.6)"}
                  >
                    {activeUser?.userName},{" "}
                    <Typography
                      component={"span"}
                      fontWeight={"bold"}
                      color={"black"}
                    >
                      aramco{" "}
                    </Typography>
                    is hiring!
                  </Typography>
                  <Button variant="outlined" sx={homeStyles.followBtn}>
                    Follow
                  </Button>
                </Stack>
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"rgba(0,0,0,0.8)"}
                  spacing={1}
                  sx={homeStyles.footerTextStyles}
                >
                  <Stack
                    direction={"row"}
                    spacing={2.5}
                    justifyContent={"center"}
                  >
                    <Typography>About</Typography>
                    <Typography>Accessibility</Typography>
                    <Typography>Help Center</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"center"}
                  >
                    <Stack direction={"row"} alignItems={"center"}>
                      <Typography>Privacy & Terms</Typography>
                      <ArrowDropDownIcon />
                    </Stack>
                    <Typography>Ad Choice</Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    spacing={2}
                    justifyContent={"center"}
                  >
                    <Typography>Advertising</Typography>
                    <Stack direction={"row"} alignItems={"center"}>
                      <Typography>Business Services</Typography>
                      <ArrowDropDownIcon />
                    </Stack>
                  </Stack>

                  <Stack direction={"row"} spacing={2}>
                    <Typography>Get the LinkedIn app</Typography>
                    <Typography>More</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Box component={"img"} src={LinkedInLogo} />
                    <Typography>LinkedIn Corporation © 2024</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Modal
        open={postModalOpen}
        onClose={postModalCloser}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={homeStyles.modalStyle}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            px={2}
          >
            <Stack direction={"row"} spacing={1}>
              <Box
                component={"img"}
                src={ProfilePic}
                sx={homeStyles.profilePicInModal}
              />
              <Box>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography variant="h6" fontWeight={"bolder"}>
                    {activeUser?.userName}
                  </Typography>
                  <ArrowDropDownIcon />
                </Stack>
                <Typography variant="body1" fontSize={"14px"}>
                  Post to Anyone
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={postModalCloser}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <TextField
            multiline
            rows={8}
            sx={homeStyles.textAreaInModal}
            placeholder="What do you want to talk about?"
            value={postText}
            onChange={postTextHandler}
          />
          <Box pl={2}>
            <EmojiKeyBoard value={postText} setValue={setPostText} />
          </Box>
          <Stack direction={"row"} spacing={4} alignItems={"center"} px={2}>
            {renderPostModalBottomIcons()}
            {!postModalMoreIconOpen && (
              <ModalToolTip
                text="More"
                Icon={
                  <IconButton onClick={postModalMoreIconOpenHandler}>
                    <MoreHorizIcon sx={homeStyles.modalBottomIcon} />
                  </IconButton>
                }
              />
            )}
          </Stack>
          <Divider sx={homeStyles.dividerStyling} />
          <Stack
            direction={"row"}
            alignItems={"center"}
            alignSelf={"flex-end"}
            spacing={2}
            pr={2}
          >
            <ModalToolTip
              text="Schedule for later"
              Icon={<QueryBuilderIcon sx={homeStyles.modalBottomIcon} />}
            />
            <Button
              variant="contained"
              disabled={postText.length === 0}
              sx={homeStyles.postButton}
              onClick={postHandler}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Home;

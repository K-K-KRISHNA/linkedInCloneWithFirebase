import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CircleIcon from "@mui/icons-material/Circle";
import CollectionsIcon from "@mui/icons-material/Collections";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PublicIcon from "@mui/icons-material/Public";
import {
  Box,
  Button,
  Divider,
  Icon,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BiMessageRoundedDetail, BiRepost } from "react-icons/bi";
import { BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  default as CelebrateRounded,
  default as CelebrateSvg,
} from "../../assets/images/celebrate.svg";
import FunnySvg from "../../assets/images/funny.svg";
import InsightFulSvg from "../../assets/images/insightful.svg";
import LikeOutline from "../../assets/images/like copy.svg";
import FilledLikeSvg from "../../assets/images/like.svg";
import LikeRounded from "../../assets/images/likerounded.svg";
import LoveSvg from "../../assets/images/love.svg";
import LoveRounded from "../../assets/images/loverounded.svg";
import userPic from "../../assets/images/myImage.jpeg";
import SupportSvg from "../../assets/images/support.svg";
import { homeStyles } from "../../pages/home/HomeStyles";
import { gettingPosts, postUpGradation } from "../../redux/features/UsersSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import { EachComment, EachLike, EachPost } from "../../types/GlobalTypes";
import EmojiKeyBoard from "../emoji_menu/EmojiKeyBoard";
import { styles } from "./CardWithImageStyles";

interface IState {
  isShowComments: boolean;
  isShowCommentTextField: boolean;
  userCommentText: string;
}

const overlappedIcons = (count: number) => (
  <Stack direction={"row"}>
    <Box component={"img"} src={LikeRounded} sx={styles.tinyIcon} />
    <Box
      component={"img"}
      src={LoveRounded}
      sx={styles.tinyIcon}
      position={"relative"}
      left={-4}
    />
    <Box
      component={"img"}
      src={CelebrateRounded}
      sx={styles.tinyIcon}
      position={"relative"}
      left={-9}
    />
    <Typography color={"rgb(102,102,102)"} fontSize={"11px"}>
      {count}
    </Typography>
  </Stack>
);

const CardWithImage = ({ id, data }: { id: number; data: EachPost }) => {
  const [isShowComments, setIsShowComments] =
    useState<IState["isShowComments"]>(false);
  const [isShowCommentTextField, setIsShowCommentTextField] =
    useState<IState["isShowCommentTextField"]>(false);
  const [userCommentText, setUserCommentText] =
    useState<IState["userCommentText"]>("");
  const users = useSelector((state: RootState) => state.usersReducer.users);
  const activeUser = useSelector(
    (state: RootState) => state.usersReducer.activeUser
  );
  const dispatch = useDispatch<AppDispatch>();
  const commentTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCommentText(event.target.value);
  };

  const commentIconClickHandler = () => {
    if (isShowCommentTextField) {
      setIsShowCommentTextField(false);
      setIsShowComments(false);
    } else {
      setIsShowCommentTextField(true);
      setTimeout(() => {
        setIsShowComments(true);
      }, 750);
    }
  };
  const postOwner = users.filter((user) => user.id === data.postedBy)[0];

  const getCommentOwner = (commentedBy: string) =>
    users.filter((user) => user.id === commentedBy)[0];

  const checkLiked = () =>
    data.likes.some((each) => each.likedBy === activeUser?.id);

  const likeHandler = (likeType: EachLike["type"]) => {
    if (checkLiked()) {
      //remove  the liked object from the array
      const updatedLikes = data.likes.filter(
        (each) => each.likedBy !== activeUser?.id
      );
      const updatedPost = { ...data, likes: updatedLikes };
      dispatch(postUpGradation(updatedPost));
    } else {
      // push new like object in post
      const updatedLikes: EachLike[] = [
        ...data.likes,
        {
          likedBy: activeUser?.id!,
          likeId: Math.ceil(Math.random() * 1000000),
          type: likeType,
        },
      ];
      const updatedPost = { ...data, likes: updatedLikes };
      dispatch(postUpGradation(updatedPost));
    }
    dispatch(gettingPosts());
  };

  const commentHandler = () => {
    const updatedComments: EachComment[] = [
      ...data.comments,
      {
        commentId: Math.ceil(Math.random() * 1000000),
        text: userCommentText,
        commentedBy: activeUser?.id!,
        likes: [],
      },
    ];
    const updatedPost = { ...data, comments: updatedComments };
    dispatch(postUpGradation(updatedPost));
    dispatch(gettingPosts());
    setUserCommentText("");
  };
  const checkCommentLiked = (commentId: EachComment["commentId"]) => {
    const actualComment = data.comments.filter(
      (eachComment) => eachComment.commentId === commentId
    )[0];
    return actualComment.likes.some((each) => each.likedBy === activeUser?.id!);
  };

  const commentLikingHandler = (
    commentId: number,
    likeType: EachLike["type"]
  ) => {
    const actualComment = data.comments.filter(
      (eachComment) => eachComment.commentId === commentId
    )[0];
    let updateCommentLikes: EachLike[];
    if (checkCommentLiked(commentId)) {
      updateCommentLikes = actualComment.likes.filter(
        (each) => each.likedBy !== activeUser?.id
      );
    } else {
      updateCommentLikes = [
        ...actualComment.likes,
        {
          likeId: Math.ceil(Math.random() * 1000000),
          likedBy: activeUser?.id!,
          type: likeType,
        },
      ];
    }
    const updatedComment = { ...actualComment, likes: updateCommentLikes };
    const updatedPostComments = data.comments.map((each) =>
      each.commentId === commentId ? updatedComment : each
    );
    const updatedPost = { ...data, comments: updatedPostComments };
    dispatch(postUpGradation(updatedPost));
    dispatch(gettingPosts());
  };

  return (
    <Stack
      sx={styles.container}
      spacing={1}
      py={1}
      border={"solid 1px rgb(236,231,225)"}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        color={"gray"}
        px={1}
        pt={1}
      >
        <Typography sx={styles.suggestedText}>Suggested</Typography>
        <MoreHorizOutlinedIcon color="inherit" />
      </Stack>
      <Divider sx={styles.divider} />
      <Stack direction={"row"} justifyContent={"space-between"} px={1}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Box
            component={"img"}
            src={`https://source.unsplash.com/random/sig=${id}`}
            sx={styles.userProfilePicSize}
            borderRadius={"50%"}
          />

          <Stack>
            <Typography color={"gray"} fontSize={"13px"}>
              <Typography component={"span"} sx={styles.userName}>
                {postOwner.userName}
              </Typography>{" "}
              3rd+
            </Typography>
            <Typography sx={styles.positionDescription}>
              {postOwner.email}
            </Typography>
            <Stack direction={"row"} spacing={0.25} alignItems={"center"}>
              <Typography sx={styles.durationDaysCount}>5d</Typography>
              <FiberManualRecordIcon sx={styles.dotIcon} />
              <PublicIcon sx={styles.publicIconSizing} />
            </Stack>
          </Stack>
        </Stack>
        <Button variant="text" startIcon={<AddIcon />} sx={styles.followButton}>
          Follow
        </Button>
      </Stack>
      <Typography sx={styles.postTextDescription} px={1}>
        {data.text}
      </Typography>
      <Box
        component={"img"}
        src={`https://source.unsplash.com/random/sig=${100 + data.postId}`}
        sx={styles.postPic}
        borderRadius={"50%"}
      />
      <Stack
        direction={"row"}
        spacing={1}
        justifyContent={"space-between"}
        px={1}
      >
        {overlappedIcons(data.likes.length)}
        <Typography sx={styles.commentsCountText}>
          {data.comments.length} comment(s) - 930 reposts
        </Typography>
      </Stack>
      <Divider />
      <Stack direction={"row"} justifyContent={"space-around"}>
        <Box position={"relative"} sx={styles.iconsAndLikeBtnHolder}>
          <Button
            startIcon={
              <Box
                component={"img"}
                src={checkLiked() ? FilledLikeSvg : LikeOutline}
                sx={styles.userActionIconSizing}
              />
            }
            sx={styles.userActionButton}
            onClick={() => likeHandler("LIKE")}
          >
            Like
          </Button>
          <Paper sx={styles.iconsHolder}>
            <Stack direction={"row"} spacing={1} p={1} py={0.5}>
              <Tooltip title={"Like"} placement={"top"}>
                <Box
                  component={"img"}
                  src={FilledLikeSvg}
                  sx={styles.hoveredIcon}
                  onClick={() => likeHandler("LIKE")}
                />
              </Tooltip>
              <Tooltip title={"Celebrate"} placement="top">
                <Box
                  component={"img"}
                  src={CelebrateSvg}
                  sx={styles.hoveredIcon}
                  onClick={() => likeHandler("CELEBRATE")}
                />
              </Tooltip>
              <Tooltip title={"Support"} placement="top">
                <Box
                  component={"img"}
                  src={SupportSvg}
                  sx={styles.hoveredIcon}
                  onClick={() => likeHandler("SUPPORT")}
                />
              </Tooltip>
              <Tooltip title={"Love"} placement="top">
                <Box
                  component={"img"}
                  src={LoveSvg}
                  sx={styles.hoveredIcon}
                  onClick={() => likeHandler("LOVE")}
                />
              </Tooltip>
              <Tooltip title={"Insightful"} placement="top">
                <Box
                  component={"img"}
                  src={InsightFulSvg}
                  sx={styles.hoveredIcon}
                  onClick={() => likeHandler("INSIGHTFUL")}
                />
              </Tooltip>
              <Tooltip title={"Funny"} placement="top">
                <Box
                  component={"img"}
                  src={FunnySvg}
                  sx={styles.hoveredIcon}
                  onClick={() => likeHandler("FUNNY")}
                />
              </Tooltip>
            </Stack>
          </Paper>
        </Box>
        <Button
          startIcon={
            <BiMessageRoundedDetail style={styles.userActionIconSizing} />
          }
          sx={styles.userActionButton}
          onClick={commentIconClickHandler}
        >
          Comment
        </Button>
        <Button
          startIcon={<BiRepost style={styles.userActionIconSizing} />}
          sx={styles.userActionButton}
        >
          Repost
        </Button>
        <Button
          startIcon={<BsFillSendFill style={styles.userActionIconSizing} />}
          sx={styles.userActionButton}
        >
          Send
        </Button>
      </Stack>
      <Stack px={1.5} spacing={2}>
        {isShowCommentTextField && (
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"} mb={1}>
              <Box
                component={"img"}
                src={userPic}
                sx={styles.userPicInCommentSection}
              />
              <TextField
                size="small"
                fullWidth
                placeholder="Add a comment..."
                onChange={commentTextHandler}
                value={userCommentText}
                autoFocus={isShowCommentTextField}
                InputProps={{
                  endAdornment: (
                    <Stack direction={"row"}>
                      <EmojiKeyBoard
                        value={userCommentText}
                        setValue={setUserCommentText}
                      />
                      <IconButton>
                        <CollectionsIcon />
                      </IconButton>
                    </Stack>
                  ),
                }}
                sx={styles.userCommentTextField}
              />
            </Stack>
            {userCommentText.length !== 0 && (
              <Button
                variant="contained"
                sx={styles.commentPostButton}
                onClick={commentHandler}
              >
                Post
              </Button>
            )}
          </Box>
        )}
        {isShowComments && (
          <>
            <Stack direction={"row"} alignItems={"center"}>
              <Typography fontSize={"13px"} sx={styles.customGray}>
                Most relevant
              </Typography>
              <Icon>
                <ArrowDropDownIcon sx={styles.customGray} />
              </Icon>
            </Stack>
            {data.comments.map((comment) => (
              <Stack
                key={comment.commentId}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                direction={"row"}
                width={"100%"}
                spacing={1}
              >
                <Box
                  component={"img"}
                  src={`https://source.unsplash.com/random/sig=${
                    id + 200 + comment.commentId
                  }`}
                  alt="profile pic"
                  sx={styles.othersProfilePicComments}
                />
                <Stack spacing={1} width={"100%"}>
                  <Stack sx={styles.commentContentContainer} spacing={2}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"flex-start"}
                    >
                      <Stack>
                        <Typography color={"gray"} fontSize={"13px"}>
                          <Typography component={"span"} sx={styles.userName}>
                            {getCommentOwner(comment.commentedBy).userName}
                          </Typography>{" "}
                          3rd+
                        </Typography>
                        <Typography sx={styles.positionDescription}>
                          {getCommentOwner(comment.commentedBy).email}
                        </Typography>
                      </Stack>
                      <Stack direction={"row"} alignItems={"center"}>
                        <Typography fontSize={"12px"} color={styles.customGray}>
                          2d
                        </Typography>
                        <Icon>
                          <MoreHorizOutlinedIcon
                            fontSize="small"
                            sx={styles.customGray}
                          />
                        </Icon>
                      </Stack>
                    </Stack>
                    <Typography variant="body1" fontSize={"15px"}>
                      {comment.text}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    px={2}
                    spacing={1}
                  >
                    <Box
                      position={"relative"}
                      sx={styles.iconsAndLikeBtnHolder}
                    >
                      <Typography
                        sx={{
                          ...styles.userActionButton,
                          ...homeStyles.modalBottomIcon,
                          ...(checkCommentLiked(comment.commentId) && {
                            color: "#378fe9",
                            fontWeight: "bolder",
                          }),
                        }}
                        fontSize={"12px"}
                        onClick={() =>
                          commentLikingHandler(comment.commentId, "LIKE")
                        }
                      >
                        Like
                      </Typography>
                      <Paper sx={styles.iconsHolder}>
                        <Stack direction={"row"} spacing={1} p={1} py={0.5}>
                          <Tooltip title={"Like"} placement={"top"}>
                            <Box
                              component={"img"}
                              src={FilledLikeSvg}
                              sx={styles.hoveredIcon}
                              onClick={() =>
                                commentLikingHandler(comment.commentId, "LIKE")
                              }
                            />
                          </Tooltip>
                          <Tooltip title={"Celebrate"} placement="top">
                            <Box
                              component={"img"}
                              src={CelebrateSvg}
                              sx={styles.hoveredIcon}
                              onClick={() =>
                                commentLikingHandler(
                                  comment.commentId,
                                  "CELEBRATE"
                                )
                              }
                            />
                          </Tooltip>
                          <Tooltip title={"Support"} placement="top">
                            <Box
                              component={"img"}
                              src={SupportSvg}
                              sx={styles.hoveredIcon}
                              onClick={() =>
                                commentLikingHandler(
                                  comment.commentId,
                                  "SUPPORT"
                                )
                              }
                            />
                          </Tooltip>
                          <Tooltip title={"Love"} placement="top">
                            <Box
                              component={"img"}
                              src={LoveSvg}
                              sx={styles.hoveredIcon}
                              onClick={() =>
                                commentLikingHandler(comment.commentId, "LOVE")
                              }
                            />
                          </Tooltip>
                          <Tooltip title={"Insightful"} placement="top">
                            <Box
                              component={"img"}
                              src={InsightFulSvg}
                              sx={styles.hoveredIcon}
                              onClick={() =>
                                commentLikingHandler(
                                  comment.commentId,
                                  "INSIGHTFUL"
                                )
                              }
                            />
                          </Tooltip>
                          <Tooltip title={"Funny"} placement="top">
                            <Box
                              component={"img"}
                              src={FunnySvg}
                              sx={styles.hoveredIcon}
                              onClick={() =>
                                commentLikingHandler(comment.commentId, "FUNNY")
                              }
                            />
                          </Tooltip>
                        </Stack>
                      </Paper>
                    </Box>
                    <CircleIcon sx={{ fontSize: "4px" }} />
                    {overlappedIcons(comment.likes.length)}
                    <Typography sx={styles.customGray}>{" |"}</Typography>
                    <Typography
                      fontWeight={"bolder"}
                      fontSize={"12px"}
                      sx={styles.customGray}
                    >
                      Reply
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default CardWithImage;

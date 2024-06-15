export const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: "10px",
    // p: 1,
  },
  suggestedText: {
    fontSize: "12px",
    color: "rgba(0,0,0,0.8)",
  },
  divider: {
    width: "100%",
    color: "gray",
  },
  userProfilePicSize: {
    width: "40px",
    aspectRatio: "1/1",
    borderRadius: "50%",
  },
  userName: {
    fontSize: "14px",
    fontWeight: "bolder",
    cursor: "pointer",
    color: "black",
    "&:hover": {
      textDecoration: "underline",
      color: "rgb(55,143,233)",
    },
  },
  positionDescription: {
    fontSize: "13px",
    color: "rgba(0,0,0,0.8)",
  },
  durationDaysCount: {
    fontSize: "12px",
    color: "gray",
  },
  publicIconSizing: {
    fontSize: "9px",
    color: "gray",
  },
  dotIcon: {
    fontSize: "5px",
    color: "gray",
  },
  followButton: {
    color: "rgb(10,102,194)",
    fontWeight: "bold",
    "&.MuiButton-root": {
      textTransform: "inherit",
      fontSize: "14px",
      height: "fit-content",
      "&:hover": {
        backgroundColor: "rgba(10,102,194,0.1)",
      },
    },
  },
  postTextDescription: {
    fontSize: "14px",
  },
  postPic: {
    borderRadius: 0,
  },
  commentsCountText: {
    fontSize: "12px",
    color: "rgba(0,0,0,0.8)",
  },
  tinyIcon: {
    width: "12px",
  },
  userActionIconSizing: {
    width: "25px",
    m: 0,
  },
  userActionButton: {
    "&.MuiButtonBase-root": {
      color: "rgb(102,102,102)",
      fontWeight: "bold",
      textTransform: "inherit",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: { xs: "10px", sm: "15px" },
      px: { xs: 0, md: 2 },
      py: 1,
      "&:hover": {
        backgroundColor: { xs: "none", md: "rgba(102,102,102,0.3)" },
      },
      "& .MuiButton-startIcon": {
        m: 0,
      },
    },
  },
  hoveredIcon: {
    width: "30px",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-10px) scale(1.7,1.7)",
      transition: "0.5s ease-in",
    },
  },
  iconsAndLikeBtnHolder: {
    "&:hover > div": {
      visibility: { xs: "hidden", md: "visible" },
      "& img": {
        animationName: "wave",
        animationDuration: "0.25s",
        animationIterationCount: 1,
        animationTimingFunction: "ease-in-out",
        "@keyframes wave": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
          "100%": { transform: "translateY(0px)" },
        },
      },
      "& img:nth-of-type(1)": {
        animationDelay: "0.2s",
      },
      "& img:nth-of-type(2)": {
        animationDelay: "0.3s",
      },
      "& img:nth-of-type(3)": {
        animationDelay: "0.4s",
      },
      "& img:nth-of-type(4)": {
        animationDelay: "0.5s",
      },
      "& img:nth-of-type(5)": {
        animationDelay: "0.6s",
      },
      "& img:nth-of-type(6)": {
        animationDelay: "0.7s",
      },
    },
  },
  iconsHolder: {
    position: "absolute",
    top: -39,
    left: -40,
    borderRadius: "10px",
    visibility: "hidden",
    transition: "all 0.5s ease-in-out",
  },
  userPicInCommentSection: { width: "40px", borderRadius: "50%" },
  userCommentTextField: {
    "& .MuiInputBase-root": {
      borderRadius: "20px",
      "& input:focus~.MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0,0,0,0.6)",
      },
    },
  },
  customGray: {
    color: "rgba(0,0,0,0.8)",
  },
  othersProfilePicComments: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  commentContentContainer: {
    width: "98%",
    backgroundColor: "rgba(0,0,0,0.1)",
    p: 1,
    borderRadius: "5px",
  },
  circleFontSize: {
    fontSize: "4px",
  },
  commentPostButton: {
    "&.MuiButtonBase-root": {
      borderRadius: "20px",
      backgroundColor: "rgb(10,102,194)",
      color: "white",
      fontWeight: "bolder",
      fontSize: "12px",
      ml: 8,
    },
    "&.Mui-disabled": {
      backgroundColor: "gray",
    },
  },
};

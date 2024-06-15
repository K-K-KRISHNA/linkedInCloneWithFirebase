export const homeStyles = {
  bgContainer: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "rgb(244,242,238)",
    pt: 3,
    display: "flex",
    justifyContent: "center",
  },
  profileDetailsBg: {
    borderRadius: "10px",
    backgroundColor: "#979cA4",
    border: "solid 1px rgb(236,231,225)",
    minHeight: "300px",
    backgroundImage:
      " radial-gradient(circle at center center, #a3a3ab, #979cA4), repeating-radial-gradient(circle at center center, #a3a3ab, #a3a3ab, 21px, transparent 42px, transparent 21px)",
    backgroundBlendMode: "multiply",
    overflow: "hidden",
  },
  profileDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: "60px",
    backgroundColor: "white",
    pt: "50px",
    height: "100%",
    position: "relative",
  },
  profilePicSizing: {
    width: 80,
    aspectRation: "1/1",
    borderRadius: "50%",
    border: "solid 3px white",
    position: "absolute",
    top: -40,
  },
  dividerStyling: { width: "100%" },
  connectionsText: {
    fontSize: "12px",
    color: "rgba(0,0,0,0.6)",
    fontWeight: "bold",
  },
  growNetworkText: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  connectionsContainer: {
    width: "94%",
    "&:hover": {
      backgroundColor: "rgba(171,175,181,0.5)",
      cursor: "pointer",
    },
  },
  aiAssistingText: {
    width: "100%",
    color: "gray",
    fontWeight: "bold",
    fontSize: "14px",
    letterSpacing: "1px",
    p: 1,
    alignSelf: "flex-start",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(171,175,181,0.5)",
    },
  },
  plusButton: { height: "fit-content" },
  postText: {
    width: "100%",
    border: "solid 1px gray",
    borderRadius: 20,
    fontWeight: "bold",
    fontSize: "14px",
    p: 1,
    pl: 2,
    py: 1.5,
    color: "rgba(0,0,0,0.7)",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
  },
  postButtons: {
    textTransform: "inherit",
    color: "gray",
    fontWeight: "bold",
    fontSize: "12px",
    "&.MuiButtonBase-root": {
      px: 2,
      py: 1,
      "&:hover": {
        backgroundColor: "rgba(171,175,181,0.5)",
      },
    },
  },
  sortByText: {
    textWrap: "nowrap",
  },
  showmoreBtn: {
    "&.MuiButtonBase-root": {
      alignSelf: "flex-start",
      pl: 3,
      color: "rgb(108,108,108)",
      textTransform: "inherit",
      fontWeight: "bold",
    },
  },
  listContainer: {
    height: "230px",
    overflow: "hidden",
    transition: "1s",
  },
  followBtn: {
    "&.MuiButtonBase-root": {
      width: "fit-content",
      alignSelf: "center",
      borderRadius: 10,
      color: "rgb(10,102,194)",
      borderColor: "rgb(10,102,194)",
      fontWeight: "bold",
      textTransform: "inherit",
      fontSize: "17px",
      px: 3,
      my: 2,
    },
  },
  footerTextStyles: {
    "& p": {
      color: "rgba(0,0,0,0.8)",
      fontSize: "12px",
    },
  },
  premiumIcon: {
    fontSize: "16px",
  },
  customGrayColor: { color: "rgba(0,0,0,0.5)" },
  dividerWidth: { width: { xs: "75%", md: "85%" } },
  modalStyle: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    top: "50%",
    border: "none",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: 300, sm: "90vw", md: "70vw", lg: "45vw" },
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    py: 2,
  },
  profilePicInModal: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
  },
  textAreaInModal: {
    "& .MuiOutlinedInput-root": {
      fontSize: "22px",
      fieldset: {
        display: "none",
      },
      "& ::-webkit-input-placeholder": {
        color: "rgba(0,0,0,0.6)",
        opacity: 1,
      },
    },
  },
  modalBottomIcon: {
    color: "rgba(0,0,0,0.5)",
    cursor: "pointer",
  },
  postButton: {
    "&.MuiButtonBase-root": {
      borderRadius: "20px",
      backgroundColor: "rgb(10,102,194)",
      color: "white",
      fontWeight: "bolder",
    },
    "&.Mui-disabled": {
      backgroundColor: "gray",
    },
  },
};

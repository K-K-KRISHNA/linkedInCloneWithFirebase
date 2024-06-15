export const messageStyles = {
  searchField: {
    "& .MuiOutlinedInput-root": {
      m: 1,
      backgroundColor: "rgba(55,143,233,0.2)",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
    },
  },
  activeTabButton: {
    "&.MuiButtonBase-root": {
      color: "#01754f",
      fontWeight: "bolder",
      borderBottom: "2px solid #01754f",
      borderRadius: 0,
      width: "50%",
      textTransform: "inherit",
    },
  },
  inActiveTabButton: {
    "&.MuiButtonBase-root": {
      color: "rgba(0,0,0,0.8)",
      fontWeight: "bolder",
      borderRadius: 0,
      width: "50%",
      textTransform: "inherit",
      borderBottom: "1px solid rgba(0,0,0,0.3   )",
    },
  },
  activeChatUser: {
    backgroundColor: "rgba(10,102,194,0.1)",
    cursor: "pointer",
    borderLeft: "4px solid #01754f",
    // "& :hover": {
    //   backgroundColor: "rgba(0,0,0,0.2)",
    // },
  },
  inActiveChatUser: {
    cursor: "pointer",
    // "& :hover": {
    //   backgroundColor: "rgba(0,0,0,0.2)",
    // },
  },
  messageTextBox: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "rgba(0,0,0,0.05)",
      "& fieldset": {
        display: "none",
      },
    },
  },
};

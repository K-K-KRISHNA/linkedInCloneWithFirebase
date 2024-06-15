export const authStyles = {
  formContainer: {
    width: { xs: "90%", md: "60%", lg: "35%" },
    maxWidth: 400,
  },
  imageSizing: {
    display: { xs: "none", md: "block" },
    width: { md: "45%" },
    maxWidth: 600,
    aspectRation: "1/1",
  },
  authButtonsContainer: {
    backgroundColor: "rgba(248, 237, 221, 1)",
    display: "flex",
    borderRadius: 10,
    justifyContent: "center",
    width: { xs: "100%", md: 350 },
    maxWidth: 350,
    py: 1,
  },
  textBtn: {
    "&.MuiButtonBase-root": {
      color: "rgba(158, 137, 106, 1)",
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 10,
      px: 4,
    },
    "&.MuiButtonBase-root:hover": {
      backgroundColor: "rgba(248, 237, 221, 1)",
    },
  },
  containedButton: {
    "&.MuiButtonBase-root": {
      backgroundColor: "rgba(158, 137, 106, 1)",
      color: "white",
      textTransform: "none",
      px: { xs: 4, md: 6 },
      borderRadius: 10,
      fontWeight: 600,
    },
  },
  customTextField: {
    "& .MuiOutlinedInput-root ": {
      border: "solid 0.5px rgba(158, 137, 106, 1)",
      borderRadius: 10,
      fieldset: {
        display: "none",
      },
    },
    "& .MuiFormHelperText-root": {
      color: "red",
    },
  },
};

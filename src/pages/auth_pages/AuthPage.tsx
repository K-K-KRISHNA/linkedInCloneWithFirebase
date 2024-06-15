import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ChairImage from "../../assets/images/chairImage.jpg";
import { authStyles } from "./AuthStyles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface IState {
  authType: "LOGIN" | "REGISTER";
}

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<IState["authType"]>("LOGIN");
  const toggleTab = (auth: IState["authType"]) => {
    setActiveTab(auth);
  };

  const renderSuitableAuthPage = () => {
    if (activeTab === "LOGIN") {
      return <SignIn />;
    } else {
      return <SignUp toggleTab={toggleTab} />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Stack
        alignItems={"center"}
        minHeight={"95vh"}
        justifyContent={"space-around"}
        direction={"row"}
      >
        <Box
          component="img"
          src={ChairImage}
          alt="random"
          sx={authStyles.imageSizing}
        />
        <Stack sx={authStyles.formContainer} alignItems={"center"} gap={3}>
          <Typography variant="h5" alignSelf={"flex-end"} fontWeight={"bold"}>
            Your Logo
          </Typography>
          <Typography textAlign={"center"}>Welcome to Lorem...!</Typography>
          <Box sx={authStyles.authButtonsContainer}>
            <Button
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() => toggleTab("LOGIN")}
              variant={activeTab === "LOGIN" ? "contained" : "text"}
              sx={
                activeTab === "LOGIN"
                  ? authStyles.containedButton
                  : authStyles.textBtn
              }
            >
              Login
            </Button>
            <Button
              disableRipple
              disableFocusRipple
              disableTouchRipple
              onClick={() => toggleTab("REGISTER")}
              variant={activeTab === "REGISTER" ? "contained" : "text"}
              sx={
                activeTab === "REGISTER"
                  ? authStyles.containedButton
                  : authStyles.textBtn
              }
            >
              Register
            </Button>
          </Box>
          <Typography>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab quasi
            commodi dignissimos.
          </Typography>
          {renderSuitableAuthPage()}
        </Stack>
      </Stack>
    </Container>
  );
};

export default AuthPage;

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../../firebase/config";
import { setActiveUser } from "../../redux/features/UsersSlice";
import { AppDispatch } from "../../redux/store/Store";
import { authStyles } from "./AuthStyles";

interface IState {
  passwordType: "PASSWORD" | "TEXT";
}

interface InitialValuesType {
  userName: string;
  password: string;
  rememberMe: boolean;
}

const initialValues: InitialValuesType = {
  userName: "",
  password: "",
  rememberMe: false,
};

const validate = (values: InitialValuesType) => {
  const errors: InitialValuesType = {} as InitialValuesType;

  if (!values.userName) {
    errors.userName = "*Required";
  }
  if (!values.password) {
    errors.password = "*Required";
  }
  return errors;
};

const SignIn = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] =
    useState<IState["passwordType"]>("PASSWORD");
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = async (values: InitialValuesType) => {
    const auth = getAuth(app);
    const response = await signInWithEmailAndPassword(
      auth,
      values.userName,
      values.password
    );
    const token = response.user.uid;
    dispatch(setActiveUser(token));
    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  });

  const renderEyeIcon = () => {
    if (passwordType === "PASSWORD") {
      return <VisibilityOffIcon />;
    } else {
      return <VisibilityIcon />;
    }
  };

  const togglePasswordType = () => {
    if (passwordType === "PASSWORD") {
      setPasswordType("TEXT");
    } else {
      setPasswordType("PASSWORD");
    }
  };
  return (
    <Stack
      component={"form"}
      alignSelf={"flex-start"}
      width={"100%"}
      spacing={3}
      onSubmit={formik.handleSubmit}
    >
      <Stack spacing={1}>
        <Box component={"label"}>User Name</Box>
        <TextField
          id="userName"
          {...formik.getFieldProps("userName")}
          size="medium"
          placeholder="Enter your User name"
          fullWidth
          helperText={formik.touched.userName && formik.errors.userName}
          sx={authStyles.customTextField}
        />
      </Stack>
      <Stack spacing={1}>
        <Box component={"label"}>Password</Box>
        <TextField
          id="password"
          {...formik.getFieldProps("password")}
          size="medium"
          helperText={formik.touched.password && formik.errors.password}
          placeholder="Enter your password"
          fullWidth
          sx={authStyles.customTextField}
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordType}>
                {renderEyeIcon()}
              </IconButton>
            ),
          }}
        />
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Checkbox id="rememberMe" {...formik.getFieldProps("rememberMe")} />
          <Box component={"label"} htmlFor="rememberMe">
            Remember Me
          </Box>
        </Stack>
        <Typography>Forgot Password?</Typography>
      </Stack>
      <Stack alignSelf={"flex-end"}>
        <Button sx={authStyles.containedButton} type="submit">
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignIn;

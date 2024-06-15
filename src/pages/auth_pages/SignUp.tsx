import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../firebase/config";
import { addUser } from "../../redux/features/UsersSlice";
import { AppDispatch, RootState } from "../../redux/store/Store";
import { authStyles } from "./AuthStyles";

interface IState {
  passwordType: "PASSWORD" | "TEXT";
}

interface IProps {
  toggleTab: (tab: "LOGIN" | "REGISTER") => void;
}

interface InitialValuesType {
  email: string;
  userName: string;
  password: string;
}

const initialValues: InitialValuesType = {
  email: "",
  userName: "",
  password: "",
};

const validate = (values: InitialValuesType) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%&*])(?=.{6,12})/;
  const errors: InitialValuesType = {} as InitialValuesType;

  if (!values.userName) {
    errors.userName = "*Required";
  }
  if (!values.password) {
    errors.password = "*Required";
  } else if (values.password && values.password.length < 6) {
    errors.password = "Password must be more than 6 characters";
  } else if (values.password && values.password.length > 12) {
    errors.password = "Password cannot exceed more than 12 characters";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  }
  if (!values.email) {
    errors.email = "*Required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "*Invalid email address";
  }

  return errors;
};

const SignUp = ({ toggleTab }: IProps) => {
  const [passwordType, setPasswordType] =
    useState<IState["passwordType"]>("PASSWORD");
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.usersReducer.users);
  const onSubmit = async (values: InitialValuesType) => {
    const auth = getAuth(app);
    const response = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    const token = await response.user.uid;
    dispatch(addUser({ ...values, id: token }));
    toggleTab("LOGIN");
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
        <Box component={"label"}>Email Address</Box>
        <TextField
          id="email"
          {...formik.getFieldProps("email")}
          size="medium"
          placeholder="Enter your email address"
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          sx={authStyles.customTextField}
        />
      </Stack>
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
      <Stack alignSelf={"flex-end"}>
        <Button sx={authStyles.containedButton} type="submit">
          Register
        </Button>
      </Stack>
    </Stack>
  );
};

export default SignUp;

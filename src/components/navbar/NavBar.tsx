import { Box, Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBarPic from "../../assets/images/navbar.png";
import { app } from "../../firebase/config";
import { clearingStore } from "../../redux/features/UsersSlice";
import { AppDispatch } from "../../redux/store/Store";
import { navStyles } from "./NavStyles";
const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("ActiveUser");
    const auth = getAuth(app);
    auth.signOut();
    navigate("/auth");
    dispatch(clearingStore());
  };
  return (
    <Box position={"sticky"} top={0} zIndex={3}>
      <Box
        component="img"
        src={NavBarPic}
        height={"50px"}
        width="100%"
        sx={navStyles.hidingNav}
      />
      <Button variant="contained" onClick={logoutHandler}>
        Log out
      </Button>
      <Button variant="contained" onClick={() => navigate("/chat")}>
        goto chat
      </Button>
    </Box>
  );
};

export default NavBar;

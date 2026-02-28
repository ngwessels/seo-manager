//React
import React from "react";
//Redux
import { connect } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


//Firebase
import firebase from "src/firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

import { BootstrapDialog } from "./BootstrapDialog";

//Server Call
import { serverCall } from "src/utilities/serverCall";

//Components
import { DialogScreens } from "../interfaces";

interface State {
  loading: boolean;
  loginError: string;
  userSetup: boolean;
  userAuthorized: boolean;
  userLoaded: boolean;
}

class Login extends React.Component<DialogScreens, State> {
  constructor(props: DialogScreens) {
    super(props);
    this.state = {
      loading: false,
      loginError: "",
      userAuthorized: props?.user?.authorizedProject,
      userLoaded: props?.user?.isLoggedIn,
      userSetup: false
    };
  }

  componentDidMount = () => {
    const userLoaded = this.props?.user?.isLoggedIn;
    const userAuthorized = this.props?.user?.authorizedProject;

    this.setState({
      userAuthorized,
      userLoaded,
      userSetup: false
    });
  };

  componentDidUpdate = (prevProps: any) => {
    if (
      prevProps?.user?.isLoggedIn !== this.props?.user?.isLoggedIn ||
      prevProps?.user?.authorizedProject !== this.props?.user?.authorizedProject
    ) {
      this.setState({
        userAuthorized: this.props?.user?.authorizedProject,
        userLoaded: this.props?.user?.isLoggedIn
      });
      this.userLoginSetup();
    }
  };

  userLoginSetup = () => {
    const userLoaded = this.props?.user?.isLoggedIn;
    const userAuthorized = this.props?.user?.authorizedProject;

    if (
      userLoaded === true &&
      userAuthorized === false &&
      this.state.userSetup === false
    ) {
      this.setState({ userSetup: true });

      auth?.currentUser?.getIdToken().then(async (token) => {
        console.log(this.props);
        const response = await serverCall(
          "/seo/setup_authorization",
          "post",
          { pageId: this.props?.seoData?.initial?.page?.pageId },
          undefined,
          { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
        );
        console.log("Authorization Setup Response: ", response);
      });
    }
  };

  render() {
    if (this.state.userAuthorized || !this.state.userLoaded) {
      return null;
    }
    return (
      <>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="SEO Manager Login"
          open={true}
          maxWidth={false}
          style={{ zIndex: 100 }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Login
            <IconButton
              aria-label="close"
              onClick={this.props.onClose}
              sx={{
                position: "absolute",
                right: 12,
                top: 10,
                color: "#94a3b8",
                "&:hover": { color: "#f8fafc", backgroundColor: "rgba(255,255,255,0.1)" }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 4,
                gap: 2
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1
                }}
              >
                <LockOutlinedIcon sx={{ color: "#475569", fontSize: 28 }} />
              </Box>
              <Typography sx={{ color: "#1e293b", fontSize: "1rem", fontWeight: 600 }}>
                Authentication Required
              </Typography>
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  maxWidth: 400,
                  lineHeight: 1.6
                }}
              >
                Please login to your SEO Manager account to continue. Scan the QR Code or use the redirect link to authenticate.
              </Typography>
            </Box>
          </DialogContent>
        </BootstrapDialog>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(Login);

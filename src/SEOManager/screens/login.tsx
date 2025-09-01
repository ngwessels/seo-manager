//React
import React from "react";
//Redux
import { connect } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  // TextField,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


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
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            className={"nextjs-seo-manager__title"}
          >
            Login
            <IconButton
              aria-label="close"
              // onClick={this.resetData}
              onClick={this.props.onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box mb={1}>
              <Typography className={"nextjs-seo-manager__p"}>
                Please login to your SEO Manager Account to continue. To Login
                either scan the QR Code or Click the redirect link below.
              </Typography>
            </Box>

            {/* <form onSubmit={this.signIn}>
              
              
                <TextField
                  id="email"
                  label="Email address"
                  variant="standard"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  required={true}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Box mb={1}>
                <TextField
                  id="password"
                  label="Password"
                  variant="standard"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  required={true}
                  type={"password"}
                  style={{ width: "100%" }}
                />
              </Box>
              {this.state.loginError && (
                <div
                  className="alert alert-danger d-flex align-items-center"
                  role="alert"
                  style={{ marginTop: 15 }}
                >
                  <svg
                    className="bi flex-shrink-0 me-2"
                    width="24"
                    height="24"
                    role="img"
                    aria-label="Danger:"
                  >
                    <use xlinkHref="#exclamation-triangle-fill" />
                  </svg>
                  <div>{this.state.loginError}</div>
                </div>
              )}
              <div className="d-grid gap-2">
                <LoadingButton
                  loading={this.state.loading}
                  variant="contained"
                  type={"submit"}
                  style={{ marginTop: 15 }}
                  fullWidth
                  className={"nextjs-seo-manager__button"}
                >
                  Login
                </LoadingButton>
              </div>
            </form> */}
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

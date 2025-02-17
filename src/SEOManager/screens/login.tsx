//React
import React from "react";
//Redux
import { connect } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Grid,
  Button
} from "@mui/material";
// import { MdClose } from "react-icons/md";
// import LoadingButton from "@mui/lab/LoadingButton";

import { BootstrapDialog } from "./BootstrapDialog";

//Firebase
import firebase from "src/firebase";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebase);

//Components
import { DialogScreens } from "../interfaces";

interface State {
  loading: boolean;
  loginError: string;
  email: string;
  password: string;
}

class Login extends React.Component<DialogScreens, State> {
  constructor(props: DialogScreens) {
    super(props);
    this.state = {
      loading: false,
      loginError: "",
      email: "",
      password: ""
    };
  }

  signIn = async (e: any) => {
    //Sign in User
    e.preventDefault();
    this.setState({ loading: true });
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((error: any) => {
        // const errorMessage = error.message;
        this.setState({ loginError: error.code, loading: false });
      });
  };

  signOut = async () => {
    //Signs out user
    await signOut(auth);
  };

  render() {
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
            ></IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={this.signIn}>
              <Typography className={"nextjs-seo-manager__p"}>
                Please login to your SEO Manager Account to continue
              </Typography>
              <Grid item mb={1}>
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
              <Grid item mb={1}>
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
              </Grid>
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
                <Button
                  // loading={this.state.loading}
                  variant="contained"
                  type={"submit"}
                  style={{ marginTop: 15 }}
                  fullWidth
                  className={"nextjs-seo-manager__button"}
                >
                  Login
                </Button>
              </div>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user
});

export default connect(mapStateToProps)(Login);

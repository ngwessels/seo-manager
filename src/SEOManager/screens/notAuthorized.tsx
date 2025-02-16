//React
import React from "react";
//Redux
import { connect } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography
} from "@mui/material";
// import { MdClose } from "react-icons/md";

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

class NotAuthorized extends React.Component<DialogScreens, State> {
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
            Not Authorized
            <IconButton
              aria-label="close"
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
            <Typography>
              Unfortunately it appears you are not authorized to make changes to
              this website! Is it possible your signed in on the wrong account?{" "}
              <a onClick={this.signOut} style={{ cursor: "pointer" }}>
                <strong>Click Here to Sign Out</strong>
              </a>
            </Typography>
          </DialogContent>
        </BootstrapDialog>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user
});

export default connect(mapStateToProps)(NotAuthorized);

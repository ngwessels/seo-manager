//React
import React from "react";
//Redux
import { connect } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Button,
  Box
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import { BootstrapDialog } from "./BootstrapDialog";

//Firebase
import firebase from "src/firebase";
import { getAuth, signOut } from "firebase/auth";
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

  signOut = async () => {
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
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Access Denied
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
                  backgroundColor: "#fef2f2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1
                }}
              >
                <BlockOutlinedIcon sx={{ color: "#dc2626", fontSize: 28 }} />
              </Box>
              <Typography sx={{ color: "#1e293b", fontSize: "1rem", fontWeight: 600 }}>
                Not Authorized
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
                You don't have permission to make changes to this website. If you're signed in on the wrong account, try signing out below.
              </Typography>
              <Button
                variant="outlined"
                onClick={this.signOut}
                sx={{
                  mt: 1,
                  borderColor: "#e2e8f0",
                  color: "#dc2626",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  px: 4,
                  "&:hover": { borderColor: "#dc2626", backgroundColor: "#fef2f2" }
                }}
              >
                Sign Out
              </Button>
            </Box>
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

//React
import React from "react";
//Redux
import { connect } from "react-redux";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Link
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";


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
  qrCode: string;
  redirectUrl: string;
  authLoading: boolean;
  authError: string;
  pollInterval: ReturnType<typeof setInterval> | null;
}

class Login extends React.Component<DialogScreens, State> {
  constructor(props: DialogScreens) {
    super(props);
    this.state = {
      loading: false,
      loginError: "",
      userAuthorized: props?.user?.authorizedProject,
      userLoaded: props?.user?.isLoggedIn,
      userSetup: false,
      qrCode: "",
      redirectUrl: "",
      authLoading: false,
      authError: "",
      pollInterval: null
    };
  }

  componentWillUnmount = () => {
    if (this.state.pollInterval) {
      clearInterval(this.state.pollInterval);
    }
  };

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
      this.setState({ userSetup: true, authLoading: true, authError: "" });

      auth?.currentUser?.getIdToken().then(async (token) => {
        try {
          const response = await serverCall(
            "/seo/setup_authorization",
            "post",
            { pageId: this.props?.seoData?.initial?.page?.pageId },
            undefined,
            { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
          );

          if (response?.results?.qr && response?.results?.url) {
            this.setState({
              qrCode: response.results.qr,
              redirectUrl: response.results.url,
              authLoading: false
            });
            this.startAuthPolling();
          } else {
            this.setState({
              authLoading: false,
              authError: response?.error || "Failed to generate authentication. Please try again."
            });
          }
        } catch (err) {
          this.setState({
            authLoading: false,
            authError: "Failed to connect to the server. Please try again."
          });
        }
      });
    }
  };

  startAuthPolling = () => {
    if (this.state.pollInterval) return;

    const projectId = this.props?.seoData?.initial?.projectId;
    const permissionLevels = ["owner", "admin", "editor"];

    const pollInterval = setInterval(async () => {
      try {
        const user = auth?.currentUser;
        if (!user) return;

        const tokenResult = await user.getIdTokenResult(true);
        const claim = tokenResult?.claims?.[projectId];

        let isAuthorized = false;
        if (claim && permissionLevels.includes(claim as string)) {
          isAuthorized = true;
        } else if (claim && typeof claim === "string") {
          try {
            const { timeStamp } = JSON.parse(claim as string);
            if (new Date().toISOString() < new Date(timeStamp).toISOString()) {
              isAuthorized = true;
            }
          } catch {}
        }

        if (isAuthorized) {
          clearInterval(pollInterval);
          this.setState({ pollInterval: null, userAuthorized: true });
          (this.props as any)?.dispatch?.({
            type: "SET_USER",
            results: {
              ...JSON.parse(JSON.stringify(user)),
              authorizedProject: true,
              isLoggedIn: true
            }
          });
        }
      } catch {}
    }, 5000);

    this.setState({ pollInterval });
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

              {this.state.authLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, mt: 1 }}>
                  <CircularProgress size={32} sx={{ color: "#475569" }} />
                  <Typography sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                    Generating authentication...
                  </Typography>
                </Box>
              )}

              {this.state.authError && !this.state.authLoading && (
                <Typography sx={{ color: "#ef4444", fontSize: "0.85rem", textAlign: "center", mt: 1 }}>
                  {this.state.authError}
                </Typography>
              )}

              {this.state.qrCode && !this.state.authLoading && (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 1 }}>
                  <Box
                    sx={{
                      p: 1.5,
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
                    }}
                  >
                    <img
                      src={`data:image/png;base64,${this.state.qrCode}`}
                      alt="Authentication QR Code"
                      style={{ display: "block", width: 200, height: 200 }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.8rem" }}>or</Typography>
                  </Box>

                  <Link
                    href={this.state.redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                      color: "#3b82f6",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textDecoration: "none",
                      px: 2,
                      py: 1,
                      borderRadius: "8px",
                      border: "1px solid #bfdbfe",
                      backgroundColor: "#eff6ff",
                      transition: "all 0.15s ease",
                      "&:hover": {
                        backgroundColor: "#dbeafe",
                        borderColor: "#93c5fd",
                        textDecoration: "none"
                      }
                    }}
                  >
                    Open login page
                    <OpenInNewIcon sx={{ fontSize: 16 }} />
                  </Link>
                </Box>
              )}
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

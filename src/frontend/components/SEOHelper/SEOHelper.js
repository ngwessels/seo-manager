/* eslint-disable eol-last */
import React from "react";

//PropTypes
import PropTypes from "prop-types";

// import { returnKey } from "utils/Init";
import { returnKey } from "../../../utilities/setupInit";

import "./styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Grid,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "95vw",
    maxWidth: "900px"
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  },
  "& .MuiPaper-root": {
    margin: "0px",
    maxWidth: "none !important"
  }
}));

//Firebase
import firebase from "../../../firebase";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth";
const auth = getAuth(firebase);

//Components
import Manager from "./Manager";

//Utils
import { hideModal, openModal, formattedFileName, addFiles } from "./utils";

export class SEOHelper extends React.Component {
  constructor({ head, data, onChangeComplete, onClose, open }) {
    super({ head, data, onChangeComplete, onClose, open });
    this.checkComponentErrors({ head, data, onChangeComplete, onClose, open });
    const initData = returnKey();
    this.state = {
      data: data,
      dataOriginal: data,
      head: head(this.formatHead(data)),
      loading: true,
      loaded: false,
      open: true,
      user: null,
      email: "",
      password: "",
      loginError: "",
      projectId: initData.projectId,
      authorizedUser: false,
      openManager: open ? true : false
    };
  }

  componentDidMount = () => {
    const permissionLevels = ["owner", "admin", "editor"];
    this.setState({ loading: true, user: false, loaded: true });
    onAuthStateChanged(auth, async (user) => {
      console.log(`SEOHelper Mounted:`, Date.now());
      if (user) {
        const customClaims = await user.getIdTokenResult(true);
        const userData = { ...user, customClaims: customClaims.claims };
        if (
          customClaims?.claims?.[this.state.projectId] &&
          permissionLevels.includes(
            customClaims?.claims?.[this.state.projectId]
          )
        ) {
          this.setState({ authorizedUser: true });
          // this.openManager(userData);
        } else {
          this.setState({ authorizedUser: false });
        }
        this.setState({ user: userData });
      } else {
        this.setState({ user: false });
      }
      this.setState({ loading: false });
      getAnalytics(firebase);
    });
  };

  componentDidUpdate = (prevProps) => {
    if (this.props?.open !== prevProps?.open) {
      this.setState({ openManager: this.props?.open ? true : false });
    }
  };

  checkComponentErrors = ({ head, data, onChangeComplete, onClose, open }) => {
    // if (!object.data && object.data !== false) {
    //   throw "Please add this tag to your SEOHelper component 'data={this.props.seo}'. If you are using NextJS make sure you are calling our fetchSEO function in getServerSideProps or getStaticProps and passing the data as a prop.";
    // }
    if (!head) {
      throw "Please add this tag to your SEOHelper component 'head={(data) => (<Head>{data}</Head>)}'. If your not using NextJS replace <Head>{data}</Head> with <Helmet>{data}</Helmet> from npm react-helmet.";
    }
  };

  formatHead = (data) => {
    if (!data || data.valid === false) {
      return null;
    }
    return (
      <>
        <title>{data.title || data?.defaultTitle || ""}</title>
        <meta
          name="description"
          content={data.description || data.defaultDescription || ""}
          key={"description"}
        />
        {data.keywords && <meta name="keywords" content={data.keywords} />}
        {data.canonicalURL && (
          <link href={`${data.canonicalURL}${data.path}`} rel="canonical" />
        )}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        {data.title && (
          <meta property="og:title" content={data.title || response?.error} />
        )}
        {data.description && (
          <meta
            property="og:description"
            content={data.description || data.defaultDescription}
          />
        )}

        {data?.image?.url && (
          <meta property="og:image" content={data.image.url} />
        )}
        {data.canonicalURL && (
          <meta
            property="og:url"
            content={`${data.canonicalURL}${data.path}`}
          />
        )}
        {data.title && (
          <meta name="twitter:title" content={data.title || response?.error} />
        )}
        {data.description && (
          <meta
            name="twitter:description"
            content={data.description || data.defaultDescription}
          />
        )}
        {data?.image?.url && (
          <meta name="twitter:image" content={data.image.url} />
        )}
        {(data.pageFavicon || data.projectFavicon) && (
          <link
            rel="icon"
            type="image/x-icon"
            href={data.pageFavicon || data.projectFavicon}
            sizes="192x192"
          />
        )}
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta
          name="robots"
          content={`${data.index || "index"}, ${data.follow || "follow"}`}
        />
        {data.ldJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: data.ldJson }}
          />
        )}
        {data.events && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data.events) }}
          />
        )}

        {this.props.children}
      </>
    );
  };

  signIn = async (e) => {
    //Sign in User
    e.preventDefault();
    this.setState({ loading: true });
    signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      .then((userCredential) => {
        this.setState({ loading: false });
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.setState({ loginError: error.code, loading: false });
      });
  };

  signOut = async () => {
    //Signs out user
    await signOut(auth);
  };

  resetData = () => {
    if (this.props?.onClose) {
      this.props.onClose();
    }
    this.setState({ data: this.state.dataOriginal, openManager: false });
  };

  updateData = (data, original) => {
    this.setState({ data });
    if (original === true) {
      this.setState({ dataOriginal: data });
    }
  };

  openManager = (user) => {
    this.setState({ openManager: true });
  };

  handleClose = () => {};

  render() {
    return (
      <>
        {this.state.loaded === false && this.state.user === null ? (
          <>{this.state.head}</>
        ) : (
          <>{this.props.head(this.formatHead(this.state.data))}</>
        )}

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          id={"open-seo-manager"}
          style={{ display: "none" }}
          onClick={this.openManager}
        />
        <BootstrapDialog
          onClose={this.resetData}
          aria-labelledby="customized-dialog-title"
          open={this.state.openManager}
          maxWidth={false}
          style={{ zIndex: 100 }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            SEO Manager
            <IconButton
              aria-label="close"
              onClick={this.resetData}
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
          {this.state.user &&
            this.state.authorizedUser === true &&
            this.state.openManager === true && (
              <Manager
                onChange={this.updateData}
                data={this.state.data}
                dataOriginal={this.state.dataOriginal}
                resetData={this.resetData}
                onChangeComplete={this.props.onChangeComplete}
                user={this.state.user}
              />
            )}
          {this.state.user === false && this.state.loading === false && (
            <DialogContent>
              <form onSubmit={this.signIn}>
                <Typography>
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
                    variant="contained"
                    type={"submit"}
                    style={{ marginTop: 15 }}
                    fullWidth
                  >
                    Login
                  </Button>
                </div>
              </form>
            </DialogContent>
          )}
          {this.state.loading === false &&
            this.state.user &&
            this.state.authorizedUser === false && (
              <>
                <DialogContent>
                  <p>
                    Unfortunately it appears you are not authorized to make
                    changes to this website! Is it possible your signed in on
                    the wrong account?{" "}
                    <a onClick={this.signOut} style={{ cursor: "pointer" }}>
                      <strong>Click Here to Sign Out</strong>
                    </a>
                  </p>
                </DialogContent>
              </>
            )}
          {this.state.loading === true && (
            <DialogContent dividers>
              <div
                style={{
                  width: "100%",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <CircularProgress />
              </div>
            </DialogContent>
          )}
        </BootstrapDialog>
      </>
    );
  }
}

// export default SEOHelper;

// head, data, onChangeComplete, onClose, open
SEOHelper.propTypes = {
  head: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  onChangeComplete: PropTypes.any,
  onClose: PropTypes.any,
  open: PropTypes.bool
};

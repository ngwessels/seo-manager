/* eslint-disable eol-last */
import React from "react";

import { returnKey } from "utils/Init";

import "./styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  },
  "& .MuiPaper-root": {
    margin: "0px",
    width: "90vw",
    maxWidth: "900px"
  }
}));

//Firebase
import { firebase } from "../../firebase";
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

type SEOObject = {
  children?: React.ReactNode;
  head: any;
  data: any;
  onChangeComplete?: any;
  onClose?: any;
  hideBootstrap?: boolean;
};

class SEOHelper extends React.Component<
  {
    children?: React.ReactNode;
    data: any;
    head: any;
    onChangeComplete: any;
    onClose: any;
    hideBootstrap?: boolean;
  },
  {
    data: any;
    head: any;
  }
> {
  state: {
    data: any;
    dataOriginal: any;
    head: any;
    loading: boolean;
    loaded: boolean;
    open: boolean;
    user: any;
    email: string;
    password: string;
    loginError: string;
    projectId: string;
    authorizedUser: boolean;
    openManager: boolean;
  };
  constructor(object: SEOObject) {
    super(object);
    this.checkComponentErrors(object);
    const initData: any = returnKey();
    this.state = {
      data: object.data,
      dataOriginal: object.data,
      head: object.head(this.formatHead(object.data)),
      loading: false,
      loaded: false,
      open: true,
      user: null,
      email: "",
      password: "",
      loginError: "",
      projectId: initData.projectId,
      authorizedUser: false,
      openManager: false
    };
  }

  componentDidMount = () => {
    console.log(`SEOHelper Mounted:`, Date.now());
    this.setState({ loading: true, user: false, loaded: true });
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const customClaims = await user.getIdTokenResult(true);
        const userData = { ...user, customClaims: customClaims.claims };
        if (customClaims?.claims?.[this.state.projectId] === "admin") {
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

  checkComponentErrors = (object: SEOObject) => {
    if (!object.data && object.data !== false) {
      throw "Please add this tag to your SEOHelper component 'data={this.props.seo}'. If you are using NextJS make sure you are calling our fetchSEO function in getServerSideProps or getStaticProps and passing the data as a prop.";
    }
    if (!object.head) {
      throw "Please add this tag to your SEOHelper component 'head={(data) => (<Head>{data}</Head>)}'. If your not using NextJS replace <Head>{data}</Head> with <Helmet>{data}</Helmet> from npm react-helmet.";
    }
  };

  formatHead = (data: any) => {
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

        {data.image.url && (
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
        {data.image.url && (
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
        {this.props.children}
      </>
    );
  };

  signIn = async (e: any) => {
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
    this.setState({ data: this.state.dataOriginal, openManager: false });
  };

  updateData = (data: any, original: boolean) => {
    this.setState({ data });
    if (original === true) {
      this.setState({ dataOriginal: data });
    }
  };

  openManager = (user?: any) => {
    //Checks if user is authorized to make updates
    // if (
    //   this.state.user?.customClaims?.[this.state.projectId] === "admin" ||
    //   user?.customClaims?.[this.state.projectId] === "admin"
    // ) {
    //   this.setState({ openManager: true });
    // }
    this.setState({ openManager: true });
  };

  handleClose = () => {};

  render() {
    return (
      <React.Fragment>
        {this.state.loading === false && this.state.user === null ? (
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
          {this.state.loading === false &&
            this.state.user &&
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
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

export default SEOHelper;

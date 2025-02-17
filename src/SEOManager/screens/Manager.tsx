//React
import React from "react";

//Redux
import { connect } from "react-redux";

//PropTypes
import PropTypes from "prop-types";

//Firebase
import firebase from "src/firebase";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(firebase);

//Styling
import {
  Button,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  DialogContent,
  DialogActions,
  IconButton,
  DialogTitle,
  Autocomplete,
  Chip,
  Box,
  Tabs,
  Tab
} from "@mui/material";
// import { MdClose } from "react-icons/md";
// import LoadingButton from "@mui/lab/LoadingButton";

//Server Call
import { serverCall } from "src/utilities/serverCall";

//Components
import OpenDashboard from "../components/OpenDashboard";
import PhotosViewer from "../components/PhotosViewer";
import { BootstrapDialog } from "./BootstrapDialog";

//Interfaces
import { ManagerOptions } from "../interfaces";

interface State {
  savedLocations: any;
  loading: boolean;
  saving: boolean;
  newImage: string;
  file: any;
  performActionOnUpdate: any;
  photoManager: boolean;
  tabIndex: number;
  isNewPage: boolean;
  data?: any;
  isMobile: boolean;
}

class Manager extends React.Component<ManagerOptions, State> {
  constructor(props: ManagerOptions) {
    super(props);
    this.state = {
      loading: true,
      saving: false,
      newImage: "",
      file: null,
      performActionOnUpdate: {},
      photoManager: true,
      tabIndex: 0,
      savedLocations: {},
      isNewPage: false,
      isMobile: true
    };
  }

  componentDidMount = async () => {
    this.props.onIsLoading(true);
    this.setState({ loading: true });

    auth?.currentUser?.getIdToken().then(async (token) => {
      const response = await serverCall(
        "/seo/authorized_get",
        "put",
        {
          path: this.props?.seoData?.initial?.page?.path || ""
        },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );
      if (response?.results?.seoRequest) {
        const action = {
          type: "SET_MANAGER_SEO_DATA",
          results: response?.results?.seoRequest
        };
        this.props.dispatch(action);
      }
      if (response?.results?.plan) {
        const action = {
          type: "SET_MANAGER_PROJECT_PLAN",
          results: response?.results?.plan
        };
        this.props.dispatch(action);
      }

      this.setState({
        loading: false,
        isNewPage: response?.results?.isNewPage ? true : false
      });
      setTimeout(() => {
        this.props.onIsLoading(false);
      }, 1000);
    });
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.setState({ isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  onPageChange = (value: any, location: any) => {
    let page = { ...this.props?.seoData?.manager?.page };
    page[location] = value;
    const action = {
      type: "UPDATE_MANAGER_SEO_DATA",
      location: "page",
      results: page
    };
    this.props.dispatch(action);

    let savedLocations = this.state.savedLocations;
    savedLocations["page"] = true;

    this.setState({ savedLocations });
  };

  onGlobalChange = (value: any, location: any) => {
    let global = { ...this.props?.seoData?.manager?.global };
    global[location] = value;
    const action = {
      type: "UPDATE_MANAGER_SEO_DATA",
      location: "global",
      results: global
    };
    this.props.dispatch(action);

    let savedLocations = this.state.savedLocations;
    savedLocations["global"] = true;
    this.setState({ savedLocations });
  };

  addPerformAction = (e: any, type: any) => {
    //Adds a perform action that takes place when user clicks submit. TODO: A menu will pop up and user will accept that will details all major changes that will be made on save
    let performAction = this.state.performActionOnUpdate;
    performAction[type] = e;
    this.setState({ performActionOnUpdate: performAction });
  };

  saveData = () => {
    //Saves Data
    this.setState({ saving: true });
    auth?.currentUser?.getIdToken().then(async (token) => {
      const awaitActions = Object.keys(
        this.state.performActionOnUpdate || []
      ).map(async (idx) => {
        const action = this.state.performActionOnUpdate[idx];
        if (action && action.action) {
          await action.action();
        }
        return true;
      });
      await Promise.all(awaitActions);

      if (this.state.isNewPage === true) {
        //New Page
        const response = await serverCall(
          "/seo/create",
          "post",
          {
            data: this.props?.seoData?.manager,
            savedLocations: this.state.savedLocations
          },
          undefined,
          { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
        );

        if (response?.results && this.props.onChangeComplete) {
          this.props.onChangeComplete(response?.results);
        }

        this.setState({ saving: false });
      } else {
        //Existing page
        const response = await serverCall(
          "/seo/update",
          "put",
          {
            data: this.props?.seoData?.manager,
            savedLocations: this.state.savedLocations
          },
          undefined,
          { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
        );

        if (response?.results && this.props.onChangeComplete) {
          this.props.onChangeComplete(response?.results);
        }

        this.setState({ saving: false });
      }
    });
  };

  authSignOut = async () => {
    //Signs out user
    await signOut(auth);
  };

  render() {
    if (this.props?.isLoading === true) {
      return null;
    }
    return (
      <BootstrapDialog
        onClose={(_event, reason) => {
          if (reason !== "backdropClick") {
            this.props.onClose();
          }
        }}
        aria-labelledby="SEO Manager Login"
        open={true}
        maxWidth={false}
        style={{ zIndex: 100 }}
        hideBackdrop={true}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          className={"nextjs-seo-manager__title"}
        >
          SEO Manager
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
        <DialogContent dividers>
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={this.state.tabIndex}
                onChange={(_event, newValue) => {
                  this.setState({ tabIndex: newValue });
                }}
                aria-label="Select SEO Manager Options"
              >
                <Tab
                  label="Page"
                  {...a11yProps(0)}
                  className={"nextjs-seo-manager__button"}
                />
                <Tab
                  label="Global"
                  {...a11yProps(1)}
                  className={"nextjs-seo-manager__button"}
                />
                {/* <Tab label="Forms" {...a11yProps(2)} /> */}
                <Tab
                  label="Account"
                  {...a11yProps(3)}
                  className={"nextjs-seo-manager__button"}
                />
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} mt={2} display={"flex"} justifyContent={"center"}>
            <OpenDashboard />
          </Grid>
          <TabPanel value={this.state.tabIndex} index={0}>
            <Grid item xs={12}>
              <div className="form-floating mb-3">
                <PhotosViewer
                  files={
                    this.props?.seoData?.manager?.page?.image
                      ? [this.props?.seoData?.manager?.page?.image]
                      : [{ url: "", fileId: "" }]
                  }
                  onChangeComplete={(e: any) => {
                    const object = e?.url ? e : { url: "", fileId: "" };
                    this.onPageChange(object, "image");
                  }}
                  multiple={false}
                  accept={"image/png, image/jpeg, image/jpg, image/webp"}
                />
              </div>
            </Grid>
            <Grid item mb={1}>
              <TextField
                id="page-path"
                label="Page Path"
                variant="standard"
                placeholder=""
                value={this.props?.seoData?.manager?.page?.path || ""}
                style={{ width: "100%" }}
                onChange={(e) => {
                  let string = e.target.value;
                  if (string?.[0] !== "/") {
                    string = `/${string}`;
                  }
                  this.onPageChange(string, "path");
                }}
              />
            </Grid>
            <Grid item mb={1}>
              <TextField
                id="title"
                label="Title"
                variant="standard"
                placeholder="Home - Stark Industries"
                onChange={(e) => {
                  this.onPageChange(e.target.value, "title");
                }}
                value={this.props?.seoData?.manager?.page?.title || ""}
                style={{ width: "100%" }}
                helperText={`${
                  this.props?.seoData?.manager?.page?.title?.length || 0
                } of 60 (recommended)`}
              />
            </Grid>
            <Grid item mb={1}>
              <TextField
                id="description"
                label="Description"
                variant="standard"
                placeholder=""
                onChange={(e) => {
                  this.onPageChange(e.target.value, "description");
                }}
                value={this.props?.seoData?.manager?.page?.description}
                style={{ width: "100%" }}
                multiline
                helperText={`${
                  this.props?.seoData?.manager?.page?.description?.length || 0
                } of 160 (recommended)`}
              />
            </Grid>

            <Grid item mb={1}>
              <Autocomplete
                multiple
                id="tags-keywords"
                options={[]}
                value={this.props?.seoData?.manager?.page?.keywordsArray || []}
                freeSolo
                onChange={(_e, newValue) => {
                  this.onPageChange(newValue, "keywordsArray");
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Keywords"
                    placeholder="Add Keywords"
                  />
                )}
              />
            </Grid>
            <Grid item mb={1}>
              <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                <InputLabel id="follow">
                  Should search engines follow the page?
                </InputLabel>
                <Select
                  labelId="follow"
                  id="follow-select"
                  value={this.props?.seoData?.manager?.page?.follow}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "follow");
                  }}
                  label="Should search engines follow the page?"
                  style={{ zIndex: 10 }}
                >
                  <MenuItem value="">Select Follow Option</MenuItem>
                  <MenuItem value={"follow"}>Follow</MenuItem>
                  <MenuItem value={"nofollow"}>No Follow</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item mb={1}>
              <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                <InputLabel id="index">
                  Should search engines index the page?
                </InputLabel>
                <Select
                  labelId="index"
                  id="index-select"
                  value={this.props?.seoData?.manager?.page?.index}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "index");
                  }}
                  label="Should search engines index the page?"
                >
                  <MenuItem value="">Select Index Option</MenuItem>
                  <MenuItem value={"index"}>Index</MenuItem>
                  <MenuItem value={"noindex"}>No Index</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item mb={1}>
              <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                <InputLabel id="changeFreq">
                  How often will the content change?
                </InputLabel>
                <Select
                  labelId="changeFreq"
                  id="changeFreq-select"
                  value={this.props?.seoData?.manager?.page?.changeFreq}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "changeFreq");
                  }}
                  label="How often will the content change?"
                >
                  <MenuItem>Select Frequency</MenuItem>
                  <MenuItem value="always">Always</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                  <MenuItem value="never">Never</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item mb={1}>
              <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                <InputLabel id="priority">Page Prority (10 Highest)</InputLabel>
                <Select
                  labelId="priority"
                  id="priority-select"
                  value={this.props?.seoData?.manager?.page?.priority}
                  onChange={(e) => {
                    this.onPageChange(e.target.value, "priority");
                  }}
                  label="Page Priority (10 being the highest)"
                >
                  <MenuItem>Select Page Priority</MenuItem>
                  <MenuItem value={0.1}>1</MenuItem>
                  <MenuItem value={0.2}>2</MenuItem>
                  <MenuItem value={0.3}>3</MenuItem>
                  <MenuItem value={0.4}>4</MenuItem>
                  <MenuItem value={0.5}>5</MenuItem>
                  <MenuItem value={0.6}>6</MenuItem>
                  <MenuItem value={0.7}>7</MenuItem>
                  <MenuItem value={0.8}>8</MenuItem>
                  <MenuItem value={0.9}>9</MenuItem>
                  <MenuItem value={1.0}>10</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item mb={1}>
              <TextField
                id="ldJson"
                label="Structured Data"
                variant="standard"
                placeholder=""
                onChange={(e) => {
                  this.onPageChange(e.target.value, "ldJson");
                }}
                value={this.props?.seoData?.manager?.page?.ldJson}
                style={{ width: "100%" }}
                multiline
              />
            </Grid>
            {/* <Events
                  events={this.props?.seoData?.manager?.page?.events}
                  data={this.props?.seoData?.manager?.page || []}
                  onChangeComplete={this.onPageChange}
                /> */}
          </TabPanel>
          <TabPanel value={this.state.tabIndex} index={1}>
            <Grid item mb={1}>
              <TextField
                id="default-title"
                label="Default Title"
                variant="standard"
                placeholder=""
                onChange={(e) => {
                  this.onGlobalChange(e.target.value, "defaultTitle");
                }}
                value={this.props?.seoData?.manager?.global?.defaultTitle}
                style={{ width: "100%" }}
                multiline
                helperText={`${
                  this.props?.seoData?.manager?.global?.defaultTitle.length || 0
                } of 60 (recommended)`}
              />
            </Grid>
            <Grid item mb={1}>
              <TextField
                id="default-description"
                label="Default Description"
                variant="standard"
                placeholder=""
                onChange={(e) => {
                  this.onGlobalChange(e.target.value, "defaultDescription");
                }}
                value={this.props?.seoData?.manager?.global?.defaultDescription}
                style={{ width: "100%" }}
                multiline
                helperText={`${
                  this.props?.seoData?.manager?.global?.defaultDescription
                    .length || 0
                } of 160 (recommended)`}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="form-floating mb-3">
                <PhotosViewer
                  files={
                    this.props?.seoData?.manager?.global?.favicon?.fileId
                      ? [this.props?.seoData?.manager?.global?.favicon]
                      : [{ url: "", fileId: "" }]
                  }
                  onChangeComplete={(e: any) => {
                    const object = e?.url ? e : { url: "", fileId: "" };
                    this.onGlobalChange(object, "favicon");
                  }}
                  multiple={false}
                  accept={"image/png, image/jpeg, image/jpg, image/webp"}
                />
              </div>
            </Grid>
            <Grid item mb={1}>
              <TextField
                id="navbar-color"
                label="Pick a Navigation Theme Color"
                variant="standard"
                type={"color"}
                value={
                  this.props?.seoData?.manager?.global?.themeColor || "#FFFFFF"
                }
                style={{ width: "100%" }}
                onChange={(e) => {
                  this.onGlobalChange(e.target.value, "themeColor");
                }}
              />
            </Grid>
          </TabPanel>
          {/* <TabPanel value={this.state.tabIndex} index={2}>
                Forms
              </TabPanel> */}
          <TabPanel value={this.state.tabIndex} index={2}>
            <Grid container>
              <Grid
                item
                mb={1}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Button
                  variant="text"
                  onClick={this.authSignOut}
                  type="button"
                  className="nextjs-seo-manager__button"
                >
                  Sign Out
                </Button>
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <div className="modal-footer" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
              }}
            >
              <Button
                variant="text"
                id={"close-seo-manager"}
                onClick={this.props.onClose}
                type="button"
                className="nextjs-seo-manager__button"
              >
                Close
              </Button>

              <Button
                variant="text"
                onClick={this.saveData}
                type="button"
                // loading={this.state.saving}
                className="nextjs-seo-manager__button"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogActions>
      </BootstrapDialog>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(Manager);

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

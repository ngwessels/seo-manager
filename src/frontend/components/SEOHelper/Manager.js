//React
import React from "react";

//Firebase
// import { firebase } from "../../firebase";
import firebase from "../../../firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

//Server Call
import { serverCall } from "../../../utilities/serverCall";
import { setProject } from "../../../utilities/setupInit";

//Components
import PhotosViewer from "./components/PhotosViewer";
import Events from "./components/Events";

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
  CircularProgress,
  Typography,
  Autocomplete,
  Chip
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//Utils
import {
  hideModal,
  openModal,
  formattedFileName,
  addFiles,
  authSignOut
} from "./utils";

// type ManagerObject = {
//   data: any;
//   dataOriginal: any;
//   onChangeComplete?: any;
//   onClose?: any;
//   onChange: any;
//   resetData: any;
//   user: any;
// };

class Manager extends React.Component {
  constructor({
    data,
    dataOriginal,
    onChangeComplete,
    onClose,
    onChange,
    resetData,
    user
  }) {
    super({
      data,
      dataOriginal,
      onChangeComplete,
      onClose,
      onChange,
      resetData,
      user
    });
    this.state = {
      loading: true,
      saving: false,
      newImage: "",
      file: null,
      performActionOnUpdate: {},
      photoManager: true
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });

    auth?.currentUser?.getIdToken().then(async (token) => {
      const response = await serverCall(
        "/seo/authorized_get",
        "put",
        { path: this.props.data.path },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );
      if (response) {
        this.props.onChange(response?.results, true);
        setProject(response?.results);
      }
      this.setState({ loading: false });
    });
  };

  onChange = (value, location) => {
    let props = { ...this.props.data };
    if (props[location] || props[location] === "") {
      props[location] = value;
      this.props.onChange(props, false);
      this.setState({ data: props });
    } else {
      this.setState({ [location]: value });
    }
  };

  addPerformAction = (e, type) => {
    //Adds a perform action that takes place when user clicks submit. TODO: A menu will pop up and user will accept that will details all major changes that will be made on save
    let performAction = this.state.performActionOnUpdate;
    performAction[type] = e;
    this.setState({ performActionOnUpdate: performAction });
  };

  saveData = () => {
    //Saves Data
    this.setState({ saving: true });
    auth?.currentUser?.getIdToken().then(async (token) => {
      const awaitActions = Object.keys(this.state.performActionOnUpdate).map(
        async (idx) => {
          const action = this.state.performActionOnUpdate[idx];
          if (action && action.action) {
            await action.action();
          }
          return true;
        }
      );
      await Promise.all(awaitActions);

      const response = await serverCall(
        "/seo/update",
        "put",
        { data: this.props.data },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );

      if (response?.results && this.props.onChangeComplete) {
        this.props.onChangeComplete(response?.results);
      }

      this.setState({ saving: false });
      hideModal(); //Hides Modal
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? (
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
        ) : (
          <>
            <DialogContent dividers>
              <Grid item xs={12}>
                <div className="form-floating mb-3">
                  <PhotosViewer
                    files={
                      this.props?.data?.image
                        ? [this.props.data.image]
                        : [{ url: "", fileId: "" }]
                    }
                    onChangeComplete={(e) => {
                      const object = e?.url ? e : { url: "", fileId: "" };
                      this.onChange(object, "image");
                    }}
                    multiple={false}
                    accept={"image/png, image/jpeg, image/jpg"}
                    data={this.props.data}
                  />
                </div>
              </Grid>

              <Grid item mb={1}>
                <TextField
                  id="title"
                  label="Title"
                  variant="standard"
                  placeholder="Home - Stark Industries"
                  onChange={(e) => {
                    this.onChange(e.target.value, "title");
                  }}
                  value={this.props.data.title}
                  style={{ width: "100%" }}
                  helperText={`${this.props.data?.title.length || 0} of 60`}
                />
              </Grid>
              <Grid item mb={1}>
                <TextField
                  id="description"
                  label="Description"
                  variant="standard"
                  placeholder=""
                  onChange={(e) => {
                    this.onChange(e.target.value, "description");
                  }}
                  value={this.props.data?.description}
                  style={{ width: "100%" }}
                  multiline
                  helperText={`${
                    this.props.data?.description.length || 0
                  } of 160`}
                />
              </Grid>

              <Grid item mb={1}>
                <Autocomplete
                  multiple
                  id="tags-keywords"
                  options={[]}
                  defaultValue={this.props?.data?.keywordsArray || []}
                  freeSolo
                  onChange={(e, newValue) => {
                    this.onChange(newValue, "keywordsArray");
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
                    value={this.props.data.follow}
                    onChange={(e) => {
                      this.onChange(e.target.value, "follow");
                    }}
                    label="Should search engines follow the page?"
                    style={{ zIndex: 10 }}
                  >
                    <MenuItem value="">Open this Select Menu</MenuItem>
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
                    value={this.props.data.index}
                    onChange={(e) => {
                      this.onChange(e.target.value, "index");
                    }}
                    label="Should search engines index the page?"
                  >
                    <MenuItem value="">Open this Select Menu</MenuItem>
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
                    value={this.props.data.changeFreq}
                    onChange={(e) => {
                      this.onChange(e.target.value, "changeFreq");
                    }}
                    label="How often will the content change?"
                  >
                    <MenuItem>Open this select menu</MenuItem>
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
                  <InputLabel id="priority">
                    Page Prority (10 Highest)
                  </InputLabel>
                  <Select
                    labelId="priority"
                    id="priority-select"
                    value={this.props.data.priority}
                    onChange={(e) => {
                      this.onChange(e.target.value, "priority");
                    }}
                    label="Page Priority (10 being the highest)"
                  >
                    <MenuItem>Open this select menu</MenuItem>
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
                    this.onChange(e.target.value, "ldJson");
                  }}
                  value={this.props.data?.ldJson}
                  style={{ width: "100%" }}
                  multiline
                />
              </Grid>
              <Events
                events={this.props.data?.events}
                data={this.props.data || []}
                onChangeComplete={this.onChange}
              />
              <Grid
                item
                mb={1}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Button variant="text" onClick={authSignOut} type="button">
                  Sign Out
                </Button>
              </Grid>
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
                    onClick={this.props.resetData}
                    type="button"
                  >
                    Close
                  </Button>

                  <LoadingButton
                    variant="text"
                    onClick={this.saveData}
                    type="button"
                    loading={this.state.saving}
                  >
                    Save
                  </LoadingButton>
                </div>
              </div>
            </DialogActions>
          </>
        )}
      </>
    );
  }
}

export default Manager;

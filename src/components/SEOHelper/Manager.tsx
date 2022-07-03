//React
import React from "react";

//Firebase
import { firebase } from "../../firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

//Server Call
import { serverCall } from "utils/call";

//React Tags
import ReactTags from "react-tag-autocomplete";

//Components
// import PagePhotos from "./components/PagePhoto";
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
  Typography
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

type ManagerObject = {
  data: any;
  dataOriginal: any;
  onChangeComplete?: any;
  onClose?: any;
  onChange: any;
  resetData: any;
  user: any;
};

class Manager extends React.Component<{
  data: any;
  onChangeComplete?: any;
  onClose?: any;
  onChange: any;
  dataOriginal: any;
  resetData: any;
  user: any;
}> {
  state: {
    saving: boolean;
    loading: boolean;
    newImage: "";
    file: any;
    performActionOnUpdate: any;
    photoManager: boolean;
    events: any[];
  };
  reactTags: any;

  constructor(object: ManagerObject) {
    super(object);
    this.state = {
      loading: true,
      saving: false,
      newImage: "",
      file: null,
      performActionOnUpdate: {},
      photoManager: true,
      events: [
        {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "The Adventures of Kira and Morrison",
          startDate: "2025-07-21T19:00-05:00",
          endDate: "2025-07-21T23:00-05:00",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Snickerpark Stadium",
            address: {
              "@type": "PostalAddress",
              streetAddress: "100 West Snickerpark Dr",
              addressLocality: "Snickertown",
              postalCode: "19019",
              addressRegion: "PA",
              addressCountry: "US"
            }
          },
          image: [],
          description:
            "The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance.",
          offers: {
            "@type": "Offer",
            url: "https://www.example.com/event_offer/12345_201803180430",
            price: "30",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            validFrom: "2024-05-21T12:00"
          },
          performer: {
            "@type": "PerformingGroup",
            name: "Kira and Morrison"
          },
          organizer: {
            "@type": "Organization",
            name: "Kira and Morrison Music",
            url: "https://kiraandmorrisonmusic.com"
          }
        }
      ]
    };
    this.reactTags = React.createRef();
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    auth?.currentUser?.getIdToken().then(async (token) => {
      const response = await serverCall(
        "/seo/get",
        "put",
        { path: this.props.data.path },
        undefined,
        { X_Authorization: token, AuthorizationId: auth?.currentUser?.uid }
      );
      if (response) {
        this.props.onChange(response?.results, true);
        // this.onChange(this.state.events, "events");
      }
      this.setState({ loading: false });
    });
  };

  onChange = (value: any, location: string) => {
    let props = { ...this.props.data };
    if (props[location] || props[location] === "") {
      console.log(0);
      props[location] = value;
      this.props.onChange(props, false);
      this.setState({ data: props });
    } else {
      console.log(1);
      this.setState({ [location]: value });
    }
  };

  onDelete = (i: number) => {
    //On keyword tag delete
    let keywordsArray = this.props.data.keywordsArray;
    keywordsArray.splice(i, 1);
    let string = "";
    Object.keys(keywordsArray).forEach((idx) => {
      const item = keywordsArray[idx];
      string += `${item.name}, `;
    });
    this.onChange(keywordsArray, "keywordsArray");
    this.onChange(string, "keywords");
  };

  onAddition = (tag: any) => {
    //On adding a keyword tag
    let keywordsArray = this.props.data.keywordsArray;
    keywordsArray.push({ name: tag.name, id: keywordsArray.length });
    let string = "";
    Object.keys(keywordsArray).forEach((idx) => {
      const item = keywordsArray[idx];
      string += `${item.name}, `;
    });
    this.onChange(keywordsArray, "keywordsArray");
    this.onChange(string, "keywords");
  };

  addPerformAction = (e: any, type: string) => {
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

      this.setState({ saving: false });
      this.props.onChangeComplete(this.props.data.path); //TODO: onChangeComplete is a callback that informs client that a change has been made to SEO. Optionally they can use webhooks to revalidate their pages
      hideModal(); //Hides Modal
    });
  };

  render() {
    console.log("Data:", this.props.data);
    return (
      <>
        {this.state.loading ? (
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
                    onChangeComplete={(e: any) => {
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
              <ReactTags
                ref={this.reactTags}
                tags={this.props.data.keywordsArray}
                onDelete={this.onDelete}
                onAddition={this.onAddition}
                placeholderText={"Add Page Keywords"}
                allowNew={true}
                allowBackspace={true}
              />
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

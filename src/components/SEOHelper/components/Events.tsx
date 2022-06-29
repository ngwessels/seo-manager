/* eslint-disable eol-last */
import React from "react";

import { returnKey } from "utils/Init";

import "../styles.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Box
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

//Firebase
import { firebase } from "../../../firebase";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
const storage = getStorage(firebase);
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

//Utils
import { hideModal, openModal, formattedFileName, addFiles } from "../utils";

//Server Call
import { serverCall } from "utils/call";

//Models
import { EventModel } from "../../../models/structuredData";

//Components
import Form from "./Form";

type EventsObject = {
  events: any;
};

class Events extends React.Component<{
  events: any;
}> {
  state: {};
  constructor(object: EventsObject) {
    super(object);
    this.state = {
      eventModalOpen: false,
      isNewEvent: false,
      updatingEventIdx: null
    };
  }

  addEvent = () => {
    this.setState({
      eventModalOpen: true,
      isNewEvent: true,
      updatingEventIdx: null
    });
  };

  updateEvent = (idx: number) => {
    this.setState({
      eventModalOpen: true,
      isNewEvent: false,
      updatingEventIdx: idx
    });
  };

  closeModal = () => {
    this.setState({
      eventModalOpen: false,
      isNewEvent: false,
      updatingEventIdx: null
    });
  };

  render() {
    return (
      <>
        <Form
          onClose={() => {}}
          open={true}
          onDelete={() => {}}
          onChangeComplete={() => {}}
          model={new EventModel()}
          data={this.props.events[0]}
          idx={0}
          title={"Event Manager"}
        />
        <Grid item xs={12} mt={2}>
          <Typography variant={"h4"} gutterBottom>
            Events
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button variant="contained" onClick={this.addEvent}>
            Add Event
          </Button>
        </Grid>
      </>
    );
  }
}

export default Events;

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
  data: any;
  onChangeComplete: any;
};

class Events extends React.Component<{
  events: any;
  data: any;
  onChangeComplete: any;
}> {
  state: {
    eventModalOpen: boolean;
    isNewEvent: boolean;
    updatingEventIdx: number;
  };
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
    console.log("Events:", this.props.events);
    return (
      <>
        {this.state.eventModalOpen && (
          <Form
            onClose={() => {
              this.setState({
                eventModalOpen: false,
                updatingEventIdx: null,
                isNewEvent: false
              });
            }}
            open={this.state.eventModalOpen}
            onDelete={(idx: number) => {
              let events = [...this.props.events];
              // delete events[idx];
              events.splice(idx, 1);
              this.props.onChangeComplete(events, "events");
            }}
            onChangeComplete={(event: any, idx: number) => {
              let events = [...this.props.events];
              if (!events?.[idx]) {
                events.push(event);
              } else {
                events[idx] = event;
              }
              this.props.onChangeComplete(events, "events");
            }}
            model={new EventModel()}
            data={this.props.data}
            event={
              this.state.isNewEvent === true
                ? new EventModel().format
                : this.props.events[0]
            }
            idx={
              this.state.isNewEvent === true
                ? this.props.events?.length || 0
                : this.state.updatingEventIdx
            }
            title={"Event Manager"}
            deleteButton={!this.state.isNewEvent}
          />
        )}

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
        <Grid
          item
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          flexWrap={"wrap"}
          mt={3}
        >
          {this.props.events.map((item: any, idx: number) => {
            return (
              <Grid
                mt={2}
                mb={2}
                className={"event-box"}
                onClick={() => {
                  this.setState({
                    eventModalOpen: true,
                    updatingEventIdx: idx,
                    isNewEvent: false
                  });
                }}
                key={`Event-${idx}`}
              >
                <Typography variant={"h5"} textAlign={"center"} width={"100%"}>
                  {item?.name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}

export default Events;

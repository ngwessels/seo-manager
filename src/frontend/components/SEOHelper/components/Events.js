/* eslint-disable eol-last */
import React from "react";

import { returnKey } from "../../../../utilities/setupInit";

import "../styles.css";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from "@mui/material";

//Utils
import { hideModal, openModal, formattedFileName, addFiles } from "../utils";

//Server Call
import { serverCall } from "../../../../utilities/serverCall";

//Models
// import { EventModel } from "../../../../models/structuredData";
import { EventModel } from "./../../../../models/structuredData";

//Components
import Form from "./Form";

class Events extends React.Component {
  constructor(props) {
    super(props);
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

  updateEvent = (idx) => {
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
            onDelete={(idx) => {
              let events = [...this.props.events];
              // delete events[idx];
              events.splice(idx, 1);
              this.props.onChangeComplete(events, "events");
            }}
            onChangeComplete={(event, idx) => {
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
        {/* <Grid
          item
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={3}
        >
          <Button variant="contained" onClick={this.addEvent}>
            + Add Event
          </Button>
        </Grid> */}
        <Grid
          item
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          mt={3}
          mb={3}
        >
          {this.props.events.map((item, idx) => {
            return (
              <div style={{ maxWidth: 354, width: "95%", margin: 10 }}>
                <Card sx={{ width: "100%" }}>
                  {item?.image?.[0]?.url && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={item?.image?.[0]?.url}
                      alt=""
                    />
                  )}
                  {item?.image?.length === 0 ||
                    (!item?.image && (
                      <div style={{ width: "100%", height: 140 }} />
                    ))}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item?.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        this.setState({
                          eventModalOpen: true,
                          updatingEventIdx: idx,
                          isNewEvent: false
                        });
                      }}
                    >
                      Click to Update
                    </Button>
                  </CardActions>
                </Card>
              </div>
            );
          })}
        </Grid>
      </>
    );
  }
}

export default Events;

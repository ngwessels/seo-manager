/* eslint-disable eol-last */
import React from "react";

import { returnKey } from "utils/Init";

import "./styles.css";
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
  CircularProgress
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
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
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

//Components
import Manager from "./Manager";

//Utils
import { hideModal, openModal, formattedFileName, addFiles } from "./utils";

//Server Call
import { serverCall } from "utils/call";

type SEOObject = {
  selected: any;
  onChangeComplete: any;
  onClose: any;
  multiple?: boolean;
  open: boolean;
  maxFiles?: number;
};

class SEOHelper extends React.Component<{
  selected?: any;
  onChangeComplete: any;
  onClose: any;
  multiple?: boolean;
  open: boolean;
  maxFiles?: number;
}> {
  state: {
    photos: any;
    loading: boolean;
    selected: any;
    selectedArray: any;
  };
  constructor(object: SEOObject) {
    super(object);
    this.state = {
      photos: [],
      loading: true,
      selected:
        object.multiple === true && object.selected
          ? { url: "", fileId: "" }
          : { ...object.selected },
      selectedArray:
        object.multiple === true && object.selected ? [...object.selected] : []
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  getData = async () => {
    const files = await serverCall(
      "/files/getProjectFiles",
      "get",
      {},
      undefined,
      {
        X_Authorization: await auth?.currentUser?.getIdToken(),
        AuthorizationId: auth?.currentUser?.uid
      }
    );
    console.log("FILES:", files.results.photos);
    if (files.results.photos.length > 0) {
      this.setState({ photos: files.results.photos, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  imageClicked = (file: any) => {
    const selectedFile = {
      url: file.url,
      fileId: file.fileId
    };
    if (this.props.multiple === true) {
      let selectedArray = [];

      if (this.state.selectedArray) {
        selectedArray = [...this.state.selectedArray];
      }

      const index = selectedArray.indexOf((a) => {
        if (a.fileId === file.fileId) {
          return true;
        }
      });
      if (index >= 0) {
        selectedArray.splice(index, 1);
        this.setState({ selectedArray: selectedArray });
      } else {
        selectedArray.push(selectedFile);
        this.setState({ selectedArray: selectedArray });
      }
    } else {
      if (this.state.selected.fileId === file.fileId) {
        this.setState({ selected: { url: "", fileId: "" } });
      } else {
        this.setState({ selected: selectedFile });
      }
    }
  };

  save = () => {
    if (this.props.multiple === true) {
      this.props.onChangeComplete(this.state.selectedArray);
    } else {
      this.props.onChangeComplete(this.state.selected);
    }
    this.props.onClose();
  };

  render() {
    return (
      <React.Fragment>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          maxWidth={false}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            Photo Manager
            <IconButton
              aria-label="close"
              onClick={this.props.onClose}
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

          <DialogContent>
            {this.state.loading && (
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
            )}
            {this.state.loading === false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 400,
                  padding: 15
                }}
              >
                <div style={{}} className={"top"}></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    maxHeight: 500,
                    overflowY: "scroll",
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderTop: "#e3e3e3 solid 1px",
                    borderBottom: "#e3e3e3 solid 1px"
                  }}
                  className={"fileViewer"}
                >
                  {this.state.photos.map((item: any, idx: any) => {
                    let isClicked = false;
                    if (this.props.multiple === true) {
                      const index = this.state.selectedArray.indexOf((a) => {
                        if (a.fileId === item.fileId) {
                          return true;
                        }
                      });
                      if (index >= 0) {
                        isClicked = true;
                      }
                    } else if (this.state.selected.fileId === item.fileId) {
                      isClicked = true;
                    }
                    return (
                      <div
                        style={{
                          width: 150,
                          height: 150,
                          overflow: "hidden",
                          margin: 10,
                          cursor: "pointer",
                          borderRadius: 2,
                          border: isClicked
                            ? "#8a8a8a solid 2px"
                            : "#e3e3e3 dashed 1px"
                        }}
                        key={`Photo-${idx}`}
                        onClick={() => this.imageClicked(item)}
                      >
                        <img
                          src={item.url}
                          width={item.dimensions.width}
                          height={item.dimensions.height}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain"
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
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
                >
                  Close
                </Button>

                <LoadingButton
                  variant="text"
                  onClick={this.save}
                  type="button"
                  loading={false}
                >
                  Save
                </LoadingButton>
              </div>
            </div>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

export default SEOHelper;

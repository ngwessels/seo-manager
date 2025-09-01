/* eslint-disable eol-last */
import React from "react";

import "../styles.css";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  Box
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Firebase
import firebase from "src/firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";
const storage = getStorage(firebase);

//components
import { BootstrapDialog } from "../screens/BootstrapDialog";

//Interface
import { FileDetailsInterface } from "../interfaces";

interface State {
  deleteLoading: boolean;
}

class FileDetails extends React.Component<FileDetailsInterface, State> {
  constructor(props: FileDetailsInterface) {
    super(props);
    this.state = {
      deleteLoading: false
    };
  }

  componentDidMount = () => {};

  deleteFile = async () => {
    this.setState({ deleteLoading: true });
    const confirm = prompt(
      "Are you sure you want to delete this file? (yes or no)"
    );
    if (confirm === "yes") {
      alert(`File Location: ${this.props.file.location}`);
      const fileRef = ref(storage, this.props.file.location);
      await deleteObject(fileRef);
      this.props.onDelete(this.props.file, this.props.idx);
      this.setState({ deleteLoading: false });
      this.props.onClose();
    } else {
      // alert("This file has not been deleted");
    }
    this.setState({ deleteLoading: false });
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
            File Details
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
            <Box
              display={"flex"}
              flexDirection={"row"}
              flexWrap={"wrap"}
              justifyContent={"space-around"}
            >
              {this.props.isImage && (
                <Grid className={"file-details-section"} mt={2}>
                  <img
                    src={this.props.file.url}
                    width={this.props.file?.dimensions?.width || "100%"}
                    height={this.props.file?.dimensions?.height || "auto"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      cursor: "pointer",
                      zIndex: 0
                    }}
                  />
                </Grid>
              )}
              <Grid className={"file-details-section"} mt={2}>
                <Grid mb={1}>
                  <TextField
                    id="fileId"
                    label="File Id"
                    variant="standard"
                    placeholder=""
                    value={this.props.file.fileId}
                    style={{ width: "100%" }}
                    disabled={true}
                  />
                </Grid>
                <Grid mb={1}>
                  <TextField
                    id="fileName"
                    label="File Name"
                    variant="standard"
                    placeholder=""
                    value={this.props.file.fileName}
                    style={{ width: "100%" }}
                    disabled={true}
                  />
                </Grid>
                <Grid mb={1}>
                  <TextField
                    id="contentType"
                    label="Content Type"
                    variant="standard"
                    placeholder=""
                    value={this.props.file.contentType}
                    style={{ width: "100%" }}
                    disabled={true}
                  />
                </Grid>
                <Grid mb={1}>
                  <TextField
                    id="fileSize"
                    label="File Size"
                    variant="standard"
                    placeholder=""
                    value={`${this.props.file.size} bytes`}
                    style={{ width: "100%" }}
                    disabled={true}
                  />
                </Grid>
                <Grid mb={1}>
                  <TextField
                    id="url"
                    label="File Url"
                    variant="standard"
                    placeholder=""
                    value={this.props.file.url}
                    style={{ width: "100%" }}
                    disabled={true}
                  />
                </Grid>
                {this.props.file.dimensions && (
                  <>
                    <Grid mb={1}>
                      <TextField
                        id="fileWidth"
                        label="Image Width"
                        variant="standard"
                        placeholder=""
                        value={`${this.props.file.dimensions.width}px`}
                        style={{ width: "100%" }}
                        disabled={true}
                      />
                    </Grid>
                    <Grid mb={1}>
                      <TextField
                        id="fileHeight"
                        label="Image Height"
                        variant="standard"
                        placeholder=""
                        value={`${this.props.file.dimensions.height}px`}
                        style={{ width: "100%" }}
                        disabled={true}
                      />
                    </Grid>
                  </>
                )}
                {this.props.file.timeStamp && (
                  <Grid mb={1}>
                    <TextField
                      id="date"
                      label="File Uploaded on"
                      variant="standard"
                      placeholder=""
                      value={new Date(this.props.file.timeStamp).toString()}
                      style={{ width: "100%" }}
                      disabled={true}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <div
              className="modal-footer"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column"
              }}
            >
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

                <Button
                  variant="text"
                  onClick={this.deleteFile}
                  type="button"
                  disabled={this.state.deleteLoading}
                  startIcon={this.state.deleteLoading ? <CircularProgress size={16} /> : null}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

export default FileDetails;

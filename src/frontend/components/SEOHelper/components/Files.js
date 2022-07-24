/* eslint-disable eol-last */
import React from "react";

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
import firebase from "../../../../firebase";
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
import { serverCall } from "../../../../utilities/serverCall";

//Components
import File from "./File";

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

// type SEOObject = {
//   selected: any;
//   onChangeComplete: any;
//   onClose: any;
//   multiple?: boolean;
//   open: boolean;
//   maxFiles?: number;
//   data: any;
//   accept?: string;
// };

class SEOHelper extends React.Component {
  constructor({
    selected,
    onChangeComplete,
    onClose,
    multiple,
    open,
    maxFiles,
    data,
    accept
  }) {
    super({
      selected,
      onChangeComplete,
      onClose,
      multiple,
      open,
      maxFiles,
      data,
      accept
    });
    this.state = {
      files: [],
      loading: true,
      selected:
        multiple === true && selected
          ? { url: "", fileId: "" }
          : { ...selected },
      selectedArray: multiple === true && selected ? [...selected] : [],
      fileError: "",
      uploadProgress: {}
    };
  }

  componentDidMount = () => {
    // this.getData();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.open === true && prevProps.open === false) {
      this.setState({
        loading: true,
        selected:
          this.props.multiple === true && this.props.selected
            ? { url: "", fileId: "" }
            : { ...this.props.selected },
        selectedArray:
          this.props.multiple === true && this.props.selected
            ? [...this.props.selected]
            : []
      });
      this.getData();
    }
    if (this.props.open === false && prevProps.open === true) {
      this.setState({
        loading: true,
        selected: { url: "", fileId: "" },
        selectedArray: [],
        fileError: ""
      });
      this.getData();
    }
    if (
      JSON.stringify(this.props.selected) !== JSON.stringify(prevProps.selected)
    ) {
      this.setState({
        selected:
          this.props.multiple === true && this.props.selected
            ? { url: "", fileId: "" }
            : { ...this.props.selected },
        selectedArray:
          this.props.multiple === true && this.props.selected
            ? [...this.props.selected]
            : []
      });
    }
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
    if (files.results.files.length > 0) {
      this.setState({ files: files.results.files, loading: false });
    } else {
      this.setState({ loading: false });
    }
  };

  imageClicked = (file) => {
    const selectedFile = {
      url: file.url,
      fileId: file.fileId
    };
    if (this.props.accept && !this.props?.accept?.includes(file?.contentType)) {
      return this.setState({
        fileError: `Only accepting ${this.props.accept}`
      });
    } else {
      this.setState({ fileError: "" });
    }
    if (this.props.multiple === true) {
      let selectedArray = [];

      if (this.state.selectedArray) {
        selectedArray = [...this.state.selectedArray];
      }

      const index = selectedArray.findIndex((a) => {
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

  addFile = (e) => {
    let validContentType = ["image/jpeg", "image/png"];
    const files = addFiles(e, validContentType);

    if (files && !files.error && files.results.length > 0) {
      let newFiles = files.results;
      this.uploadNewFile(newFiles);
    } else if (files.error) {
      this.setState({ fileError: files.error });
    }
  };

  uploadNewFile = (newFiles) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userIdToken = await auth?.currentUser?.getIdToken();
        const response = await serverCall(
          "/files/generateFileIds",
          "post",
          { type: "default", qty: newFiles.length + 1 },
          undefined,
          {
            X_Authorization: userIdToken,
            AuthorizationId: auth?.currentUser?.uid
          }
        );

        const uploadStep = Object.keys(newFiles).map((idx) => {
          return new Promise(async (resolve, reject) => {
            const item = newFiles[idx];
            const file = item.object;
            const name = item.name;
            const fileId = response.results.photoId[idx];

            const metadata = {
              contentType: file.type,
              cacheControl: "public,max-age=604800",
              customMetadata: {
                type: "default",
                userIdToken,
                userId: auth?.currentUser?.uid,
                fileName: name,
                fileId,
                projectId: this.props.data.projectId
              }
            };

            const fileLocation = `projects/${this.props.data.projectId}/files/${fileId}`;

            const fileRef = ref(storage, fileLocation);
            const uploadTask = uploadBytesResumable(fileRef, file, metadata);

            return uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                const uploadProgress = this.state.uploadProgress;
                uploadProgress[fileId] = progress;
                this.setState({ uploadProgress });
              },
              (error) => {
                console.error("Error:", error);
                return resolve({ error: true, results: false });
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  const selectedFile = {
                    url: downloadURL,
                    fileId,
                    contentType: file.type,
                    size: file.size,
                    location: fileLocation,
                    fileName: name
                  };
                  return resolve(selectedFile);
                });
              }
            );
          });
        });

        const awaitingFiles = await Promise.all(uploadStep);
        const files = [...awaitingFiles, ...this.state.files];
        this.setState({ files, fileError: "", uploadProgress: {} });
      } catch (err) {
        console.error("Error:", err);
        this.setState({ uploadProgress: {} });
      }
    });
  };

  save = () => {
    if (this.props.multiple === true) {
      this.props.onChangeComplete(this.state.selectedArray);
    } else {
      this.props.onChangeComplete(this.state.selected);
    }
    this.props.onClose();
  };

  fileDeleted = (item, idx) => {
    const files = this.state.files;
    files.splice(idx, 1);
    this.setState({ files });

    if (this.props.multiple === true) {
      let selectedArray = this.state.selectedArray;
      const index = selectedArray.findIndex((a) => {
        if (a.fileId === item.fileId) {
          return true;
        }
      });
      if (index >= 0) {
        selectedArray.splice(index, 1);
        this.setState({ selectedArray });
        this.props.onChangeComplete(selectedArray);
      }
    } else {
      let selected = this.state.selected;
      if (item.fileId === selected.fileId) {
        this.setState({ selected: { url: "", fileId: "" } });
        this.props.onChangeComplete({ url: "", fileId: "" });
      }
    }
  };

  render() {
    let total = 0;
    let progress = 0;
    Object.keys(this.state.uploadProgress).forEach((idx) => {
      const item = this.state.uploadProgress[idx];
      total += 100;
      progress = item;
    });
    const totalProgress = (progress / total) * 100;
    return (
      <React.Fragment>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="customized-dialog-title"
          open={this.props.open}
          maxWidth={false}
        >
          <DialogTitle sx={{ m: 0, p: 2 }}>
            File Manager
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
            {this.state.loading === false && this.state?.files?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 150
                }}
              >
                <div style={{}} className={"top"}>
                  {this.props.accept && (
                    <Grid item xs={12} mb={2}>
                      <Typography textAlign={"center"}>
                        Only accepting {this.props.accept}
                      </Typography>
                    </Grid>
                  )}
                </div>
                <div className={"fileViewer"}>
                  {this.state.files.map((item, idx) => {
                    let isClicked = false;
                    if (this.props.multiple === true) {
                      const found = this.state.selectedArray.find((a) => {
                        if (a.fileId === item.fileId) {
                          return true;
                        }
                        return false;
                      });
                      if (found) {
                        isClicked = true;
                      }
                    } else if (this.state.selected.fileId === item.fileId) {
                      isClicked = true;
                    }
                    return (
                      <File
                        isClicked={isClicked}
                        key={`Photo-${idx}`}
                        onClick={() => this.imageClicked(item)}
                        item={item}
                        idx={idx}
                        onDelete={this.fileDeleted}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {this.state.loading === false && this.state?.files?.length === 0 && (
              <div
                style={{
                  width: "100%",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Typography>Add your first files</Typography>
              </div>
            )}
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
              {this.state.loading === false && (
                <div
                  className="file-upload mb-3"
                  style={{ height: 70, width: "100%" }}
                >
                  <input
                    className="file-input"
                    type="file"
                    onChange={this.addFile}
                    multiple={true}
                    style={{ zIndex: 2 }}
                  />
                  <div className={"overlay"} />

                  <div
                    style={{
                      zIndex: 0
                    }}
                  >
                    <FileUploadOutlinedIcon fontSize={"large"} />
                  </div>
                  <div className={"card-subtitle"}>
                    <Typography textAlign={"center"}>
                      Drag and drop a file here or click
                    </Typography>
                  </div>
                </div>
              )}
              {totalProgress < 100 && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgress variant="determinate" value={totalProgress} />
                </Box>
              )}

              {this.state.fileError && (
                <div
                  className="alert alert-danger d-flex align-items-center mb-3"
                  role="alert"
                  style={{ width: "100%" }}
                >
                  <Typography>{this.state.fileError}</Typography>
                </div>
              )}
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

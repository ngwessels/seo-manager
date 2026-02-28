/* eslint-disable eol-last */
import React from "react";

//Redux
import { connect } from "react-redux";

import "../styles.css";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  CircularProgress,
  Box,
  Chip
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

//Firebase
import firebase from "src/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
const storage = getStorage(firebase);
import { getAuth } from "firebase/auth";
const auth = getAuth(firebase);

//Utils
import { addFiles } from "../utils.mjs";

//Server Call
import { serverCall } from "src/utilities/serverCall";

//Components
import File from "./File";
import { BootstrapDialog } from "../screens/BootstrapDialog";

//Interface
import { FilesOptions } from "../interfaces";

interface State {
  files: any;
  loading: boolean;
  selected: any;
  selectedArray: any;
  uploadProgress: any;
  fileError: string;
}

class Files extends React.Component<FilesOptions, State> {
  constructor(props: FilesOptions) {
    super(props);
    const { selected, multiple } = props;
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

  componentDidMount = () => {};

  componentDidUpdate = (prevProps: FilesOptions) => {
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
      "put",
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

  imageClicked = (file: any) => {
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
      let selectedArray: any = [];

      if (this.state.selectedArray) {
        selectedArray = [...this.state.selectedArray];
      }

      const index = selectedArray.findIndex((a: any) => {
        if (a.fileId === file.fileId) {
          return true;
        }
        return false;
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

  addFile = (e: any) => {
    let validContentType = ["image/jpeg", "image/png"];
    const files: any = addFiles(e, validContentType, this.props?.seoData?.plan);

    if (files && !files.error && files.results.length > 0) {
      let newFiles = files.results;
      this.uploadNewFile(newFiles);
    } else if (files.error) {
      this.setState({ fileError: files.error });
    }
  };

  uploadNewFile = (newFiles: any) => {
    return new Promise(async (_resolve, _reject) => {
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

        const uploadStep = Object.keys(newFiles || []).map((idx) => {
          return new Promise(async (resolve, _reject) => {
            const item = newFiles[idx];
            const file = item.object;
            const name = item.name;
            const fileId = response.results.photoId[idx];

            const metadata: any = {
              contentType: file.type,
              cacheControl: "public,max-age=604800",
              customMetadata: {
                type: "default",
                userIdToken,
                userId: auth?.currentUser?.uid,
                fileName: name,
                fileId,
                projectId: this.props.seoData?.manager?.projectId,
                seoManagerVersion: this.props?.version
              }
            };

            const fileLocation = `projects/${this.props.seoData?.manager?.projectId}/files/${fileId}`;

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

  fileDeleted = (item: any, idx: any) => {
    const files = this.state.files;
    files.splice(idx, 1);
    this.setState({ files });

    if (this.props.multiple === true) {
      let selectedArray = this.state.selectedArray;
      const index = selectedArray.findIndex((a: any) => {
        if (a.fileId === item.fileId) {
          return true;
        }
        return false;
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

  formatStorageDisplay = () => {
    const plan = this.props?.seoData?.plan;
    if (!plan?.usageReport?.storage_used || !plan?.mb || !plan?.limitations?.storage_used) {
      return null;
    }
    const used = (plan.usageReport.storage_used / plan.mb).toFixed(1);
    const total = (plan.limitations.storage_used / plan.mb).toFixed(1);
    return `${used} / ${total} MB`;
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
    const storageDisplay = this.formatStorageDisplay();

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
                right: 12,
                top: 10,
                color: "#94a3b8",
                "&:hover": { color: "#f8fafc", backgroundColor: "rgba(255,255,255,0.1)" }
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            {this.state.loading && (
              <Box
                sx={{
                  width: "100%",
                  height: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <CircularProgress size={36} sx={{ color: "#1e293b" }} />
                <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                  Loading files...
                </Typography>
              </Box>
            )}

            {this.state.loading === false && (
              <>
                {/* Upload Zone */}
                <Box sx={{ mb: 2 }}>
                  <div
                    className="file-upload seo-upload-zone"
                  >
                    <input
                      className="file-input"
                      type="file"
                      onChange={this.addFile}
                      multiple={true}
                      style={{ zIndex: 2, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
                    />
                    <CloudUploadOutlinedIcon sx={{ fontSize: 40, color: "#94a3b8" }} />
                    <Typography sx={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 500 }}>
                      Click or drag files to upload
                    </Typography>
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                      PNG, JPG, JPEG up to 10MB
                    </Typography>
                  </div>
                </Box>

                {totalProgress > 0 && totalProgress < 100 && (
                  <Box sx={{ width: "100%", mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={totalProgress}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "#e2e8f0",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 3,
                          backgroundColor: "#1e293b"
                        }
                      }}
                    />
                  </Box>
                )}

                {this.state.fileError && (
                  <Box
                    sx={{
                      mb: 2,
                      p: 1.5,
                      backgroundColor: "#fef2f2",
                      border: "1px solid #fecaca",
                      borderRadius: "8px"
                    }}
                  >
                    <Typography sx={{ color: "#dc2626", fontSize: "0.85rem" }}>
                      {this.state.fileError}
                    </Typography>
                  </Box>
                )}

                {this.props.accept && (
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={`Accepted: ${this.props.accept}`}
                      size="small"
                      sx={{
                        backgroundColor: "#f1f5f9",
                        color: "#475569",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        borderRadius: "6px"
                      }}
                    />
                  </Box>
                )}

                {/* File Grid */}
                {this.state?.files?.length > 0 && (
                  <div className={"fileViewer"}>
                    {this.state.files.map((item: any, idx: any) => {
                      let isClicked = false;
                      if (this.props.multiple === true) {
                        const found = this.state.selectedArray.find((a: any) => {
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
                )}

                {this.state?.files?.length === 0 && (
                  <Box
                    sx={{
                      width: "100%",
                      py: 6,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1
                    }}
                  >
                    <Typography sx={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                      No files yet
                    </Typography>
                    <Typography sx={{ color: "#cbd5e1", fontSize: "0.8rem" }}>
                      Upload your first file using the area above
                    </Typography>
                  </Box>
                )}
              </>
            )}
          </DialogContent>

          <DialogActions>
            <Box
              sx={{
                display: "flex",
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
                sx={{
                  color: "#64748b",
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#f1f5f9" }
                }}
              >
                Close
              </Button>

              {storageDisplay && (
                <Chip
                  label={storageDisplay}
                  size="small"
                  sx={{
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    borderRadius: "6px",
                    letterSpacing: "0.02em"
                  }}
                />
              )}

              <Button
                variant="contained"
                onClick={this.save}
                type="button"
                disabled={false}
                sx={{
                  backgroundColor: "#1e293b",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "8px",
                  px: 4,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                  "&:hover": { backgroundColor: "#334155" }
                }}
              >
                Save
              </Button>
            </Box>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData,
  version: state?.version
});

export default connect(mapStateToProps)(Files);

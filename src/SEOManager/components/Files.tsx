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
  Grid,
  CircularProgress,
  Box
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
// import { MdClose } from "react-icons/md";

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
      // plan: {}
    };
  }

  componentDidMount = () => {
    // const plan = returnProjectPlan();
    // this.setState({ plan });
  };

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
    // const plan = returnProjectPlan();
    // this.setState({ plan });
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
        console.log("VERSION:", this.props?.version);
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
    // const plan = returnProjectPlan();
    // this.setState({ plan });
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
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            className={"nextjs-seo-manager__title"}
          >
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
            ></IconButton>
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
                      <Typography
                        textAlign={"center"}
                        className={"nextjs-seo-manager__p"}
                      >
                        Only accepting {this.props.accept}
                      </Typography>
                    </Grid>
                  )}
                </div>
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
              </div>
            )}
            {this.state.loading === false &&
              this.state?.files?.length === 0 && (
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
                  className="file-upload carousel-frame-design"
                  style={{ width: "100%", height: 140, marginBottom: 10 }}
                >
                  <input
                    className="file-input"
                    type="file"
                    onChange={this.addFile}
                    multiple={true}
                    style={{ zIndex: 2 }}
                  />
                  <iframe
                    src="https://embed.lottiefiles.com/animation/27938"
                    style={{
                      height: "100%",
                      width: "100%",
                      zIndex: 0,
                      position: "absolute"
                    }}
                  />
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end",
                      paddingBottom: 5
                    }}
                  >
                    <Typography component={"p"} style={{ opacity: 0.5 }}>
                      <i>Click or Drag-n-Drop</i>
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
                  className="nextjs-seo-manager__button"
                >
                  Close
                </Button>
                <Typography
                  align={"center"}
                  className={"nextjs-seo-manager__p "}
                >
                  {(
                    this.props?.seoData?.plan?.usageReport?.storage_used /
                    this.props?.seoData?.plan?.mb
                  ).toFixed(2)}
                  MB/
                  {(
                    this.props?.seoData?.plan?.limitations?.storage_used /
                    this.props?.seoData?.plan?.mb
                  ).toFixed(2)}
                  MB
                </Typography>
                <LoadingButton
                  variant="text"
                  onClick={this.save}
                  type="button"
                  loading={false}
                  className="nextjs-seo-manager__button"
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

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData,
  version: state?.version
});

export default connect(mapStateToProps)(Files);

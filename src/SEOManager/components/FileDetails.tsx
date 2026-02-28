/* eslint-disable eol-last */
import React from "react";

import "../styles.css";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
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

  renderDetailRow = (label: string, value: string) => (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ fontSize: "0.7rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", mb: 0.3 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: "0.85rem", color: "#1e293b", wordBreak: "break-all", lineHeight: 1.5 }}>
        {value}
      </Typography>
    </Box>
  );

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
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 3,
                pt: 1
              }}
            >
              {this.props.isImage && (
                <Box
                  sx={{
                    flex: "0 0 45%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    backgroundColor: "#f8fafc",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    overflow: "hidden",
                    p: 2
                  }}
                >
                  <img
                    src={this.props.file.url}
                    width={this.props.file?.dimensions?.width || "100%"}
                    height={this.props.file?.dimensions?.height || "auto"}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      borderRadius: 6
                    }}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                {this.renderDetailRow("File ID", this.props.file.fileId)}
                {this.renderDetailRow("File Name", this.props.file.fileName)}
                {this.renderDetailRow("Content Type", this.props.file.contentType)}
                {this.renderDetailRow("File Size", `${this.props.file.size} bytes`)}
                {this.renderDetailRow("URL", this.props.file.url)}
                {this.props.file.dimensions && (
                  <>
                    {this.renderDetailRow("Width", `${this.props.file.dimensions.width}px`)}
                    {this.renderDetailRow("Height", `${this.props.file.dimensions.height}px`)}
                  </>
                )}
                {this.props.file.timeStamp && (
                  this.renderDetailRow("Uploaded", new Date(this.props.file.timeStamp).toLocaleDateString(undefined, {
                    year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                  }))
                )}
              </Box>
            </Box>
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

              <Button
                variant="outlined"
                onClick={this.deleteFile}
                type="button"
                disabled={this.state.deleteLoading}
                startIcon={this.state.deleteLoading ? <CircularProgress size={16} /> : null}
                sx={{
                  borderColor: "#fecaca",
                  color: "#dc2626",
                  textTransform: "none",
                  fontWeight: 500,
                  borderRadius: "8px",
                  "&:hover": { borderColor: "#dc2626", backgroundColor: "#fef2f2" }
                }}
              >
                Delete File
              </Button>
            </Box>
          </DialogActions>
        </BootstrapDialog>
      </React.Fragment>
    );
  }
}

export default FileDetails;

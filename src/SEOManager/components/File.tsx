/* eslint-disable eol-last */
import React from "react";
//Redux
import { connect } from "react-redux";

import "../styles.css";
import { Typography } from "@mui/material";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

//Components
import FileDetails from "./FileDetails";

//Interface
import { FileOptions } from "../interfaces";

interface State {
  imageTypes: any;
  fileDetail: boolean;
}

class File extends React.Component<FileOptions, State> {
  constructor(props: FileOptions) {
    super(props);
    this.state = {
      imageTypes: [
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/webp",
        "image/apng",
        "image/avif",
        "image/gif",
        "image/svg+xml"
      ],
      fileDetail: false
    };
  }

  isImage = () => {
    return this.state.imageTypes.find((a: any) => {
      if (a === this.props.item.contentType) {
        return true;
      }
      return false;
    });
  };

  render() {
    const isImage = this.isImage();
    const isSelected = this.props.isClicked;

    return (
      <>
        <FileDetails
          onClose={() => {
            this.setState({ fileDetail: false });
          }}
          open={this.state.fileDetail}
          onDelete={this.props.onDelete}
          file={this.props.item}
          idx={this.props.idx}
          isImage={isImage}
        />

        <div
          style={{
            border: isSelected ? "2px solid #1e293b" : "1px solid #e2e8f0",
            backgroundColor: isSelected ? "#f8fafc" : "#ffffff",
            boxShadow: isSelected ? "0 0 0 3px rgba(30,41,59,0.1)" : "none",
            borderRadius: 8,
            overflow: "hidden",
            transition: "all 0.15s ease"
          }}
          className={"image-container"}
        >
          {isImage && (
            <img
              src={this.props.item?.url}
              width={this.props.item?.dimensions?.width || "100%"}
              height={this.props.item?.dimensions?.height || "auto"}
              onClick={this.props.onClick}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                cursor: "pointer"
              }}
            />
          )}
          {!isImage && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                gap: 4,
                padding: 8
              }}
              onClick={this.props.onClick}
            >
              <InsertDriveFileOutlinedIcon sx={{ color: "#94a3b8", fontSize: 32 }} />
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "0.7rem",
                  color: "#64748b",
                  wordBreak: "break-all",
                  lineHeight: 1.3
                }}
              >
                {this.props.item.fileName || this.props.item.contentType}
              </Typography>
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(File);

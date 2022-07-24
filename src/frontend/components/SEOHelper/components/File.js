/* eslint-disable eol-last */
import React from "react";

import "../styles.css";
import { Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

//Components
import FileDetails from "./FileDetails";

// type FileObject = {
//   isClicked: any;
//   onDelete: any;
//   onClick: any;
//   item: any;
//   idx: any;
// };

export default class File extends React.Component {
  constructor({ isClicked, onDelete, onClick, item, idx }) {
    super({ isClicked, onDelete, onClick, item, idx });
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
    return this.state.imageTypes.find((a) => {
      if (a === this.props.item.contentType) {
        return true;
      }
      return false;
    });
  };

  render() {
    const isImage = this.isImage();
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
            border: this.props.isClicked
              ? "2px solid #8a8a8a"
              : "1px dashed #e3e3e3"
          }}
          className={"image-container"}
        >
          <div
            style={{
              width: "100%",
              position: "relative"
            }}
          >
            <div style={{ position: "absolute", right: -15, top: -15 }}>
              <InfoOutlinedIcon
                fontSize="medium"
                onClick={() => {
                  this.setState({ fileDetail: true });
                }}
                style={{
                  cursor: "pointer",
                  backgroundColor: "white",
                  borderRadius: 100
                }}
              />
            </div>
          </div>
          {isImage && (
            <img
              src={this.props.item?.url}
              width={this.props.item?.dimensions?.width || "100%"}
              height={this.props.item?.dimensions?.height || "auto"}
              onClick={this.props.onClick}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "pointer",
                zIndex: 0
              }}
            />
          )}
          {!isImage && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                cursor: "pointer"
              }}
              onClick={this.props.onClick}
            >
              <Typography textAlign={"center"}>
                {this.props.item.fileName || this.props.item.contentType}
              </Typography>
            </div>
          )}
        </div>
      </>
    );
  }
}

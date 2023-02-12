//React
import React from "react";

import {
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { BootstrapDialog } from "./BootstrapDialog";

//Components
import { DialogScreens } from "../interfaces";

interface State {
  hidden: boolean;
}

class Loading extends React.Component<DialogScreens, State> {
  constructor(props: DialogScreens) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({ hidden: false });
    }, 500);
  }

  render() {
    if (this.state.hidden === true) {
      return null;
    }
    return (
      <>
        <BootstrapDialog
          onClose={this.props.onClose}
          aria-labelledby="SEO Manager Loading"
          open={true}
          maxWidth={false}
          style={{ zIndex: 100 }}
        >
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            className={"nextjs-seo-manager__title"}
          >
            Loading ...
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
              <MdClose />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
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
          </DialogContent>
        </BootstrapDialog>
      </>
    );
  }
}

export default Loading;

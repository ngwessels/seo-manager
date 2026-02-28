/* eslint-disable eol-last */
import React from "react";

//Redux
import { connect } from "react-redux";

import { Button } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getUserToken } from "src/utilities/fetch";

interface State {
  interval: any;
  userToken: string;
}

interface Props {
  user?: any;
  seoData?: any;
}

class OpenDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      interval: null,
      userToken: ""
    };
  }

  componentDidMount = () => {
    this.init();
  };

  componentWillUnmount = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({ interval: null });
    }
  };

  init = () => {
    const interval = setInterval(async () => {
      this.setUserToken();
    }, 60 * 1000);
    this.setUserToken();
    this.setState({ interval });
  };

  setUserToken = async () => {
    const userToken = await getUserToken();
    this.setState({ userToken });
  };

  openWindow = () => {
    const urlPath =
      process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
      process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
        ? `https://seomanager.dev/dashboard/?userToken=${this.state.userToken}&projectId=${this.props?.seoData?.manager?.projectId}`
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test"
        ? `http://localhost:3001/dashboard/?userToken=${this.state.userToken}&projectId=${this.props?.seoData?.manager?.projectId}`
        : `https://testing.seomanager.dev/dashboard/?userToken=${this.state.userToken}&projectId=${this.props?.seoData?.manager?.projectId}`;
    window.open(urlPath, "_blank");
  };

  render() {
    if (window?.location?.href?.includes("seomanager.dev/dashboard")) {
      return null;
    }
    if (!this.state.userToken) {
      return null;
    }
    return (
      <Button
        variant="outlined"
        onClick={this.openWindow}
        type="button"
        size="small"
        endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
        sx={{
          borderColor: "#e2e8f0",
          color: "#475569",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "0.8rem",
          borderRadius: "8px",
          px: 2,
          "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" }
        }}
      >
        Open Dashboard
      </Button>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(OpenDashboard);

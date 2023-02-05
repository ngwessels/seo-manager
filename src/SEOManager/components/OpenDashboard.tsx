/* eslint-disable eol-last */
import React from "react";

//Redux
import { connect } from "react-redux";

import { Button } from "@mui/material";
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
      <>
        <Button
          variant="text"
          onClick={this.openWindow}
          type="button"
          className="nextjs-seo-manager__button"
        >
          Open Dashboard
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  user: state?.user,
  seoData: state?.seoData
});

export default connect(mapStateToProps)(OpenDashboard);

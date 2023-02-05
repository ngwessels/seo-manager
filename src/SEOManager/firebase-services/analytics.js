//React
import React from "react";

//Firebase
import firebase from "src/firebase";
import { getAnalytics } from "firebase/analytics";

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    getAnalytics(firebase);
  };

  render() {
    return null;
  }
}

export default Analytics;

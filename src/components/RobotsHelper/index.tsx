import { Component } from "react";

import { serverCall } from "./../../utils/call";

class RobotsHelper extends Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/plain");
    try {
      const { results } = await serverCall("/robots/", "put");
      res.write(results);
    } catch (err) {
      console.error(err.error);
    }
    res.end();
  }
}

export default RobotsHelper;

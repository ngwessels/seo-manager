import { Component } from "react";

import { serverCall } from "../../../utilities/serverCall";

export class RobotsHelper extends Component {
  static async getInitialProps({ res, req }) {
    res.setHeader("Content-Type", "text/plain");
    try {
      const { results } = await serverCall("/robots/", "put", {
        headers: req.headers
      });
      res.write(results);
    } catch (err) {
      console.error(err.error);
    }
    res.end();
  }
}

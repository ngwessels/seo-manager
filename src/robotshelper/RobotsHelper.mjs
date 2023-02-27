import { Component } from "react";

import { serverSecretCall } from "src/utilities/serverCall";

export class RobotsHelper extends Component {
  static async getInitialProps({ res, req }) {
    res.setHeader("Content-Type", "text/plain");
    try {
      const { results } = await serverSecretCall("/robots/", "put", {
        headers: req?.headers || {}
      });
      res.write(results);
    } catch (err) {
      console.error(err.error);
    }
    res.end();
  }
}

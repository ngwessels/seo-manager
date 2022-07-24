import React from "react";

import { serverCall } from "../../../utilities/serverCall";

export class SitemapHelper extends React.Component {
  static async getInitialProps({ res, req }) {
    res.setHeader("Content-Type", "text/xml");
    try {
      const { results } = await serverCall("/sitemap/", "put", {
        path: req.url
      });
      res.write(results);
    } catch (err) {
      console.error(err.error);
    }
    res.end();
  }
}

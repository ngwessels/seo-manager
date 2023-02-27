import React from "react";

import { serverSecretCall } from "src/utilities/serverCall";

export class SitemapHelper extends React.Component {
  static async getInitialProps({ res, req }) {
    res.setHeader("Content-Type", "text/xml");
    try {
      const { results } = await serverSecretCall("/sitemap/", "put", {
        path: req.url,
        headers: req?.headers || {}
      });
      res.write(results);
    } catch (err) {
      console.error(err.error);
    }
    res.end();
  }
}

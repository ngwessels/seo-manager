// import axios from "axios";
const axios = require("axios");
import { returnKey } from "./setupInit";

const version = "v1";

export const serverCall = (path, method = "put", data, url, headers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData = returnKey(); //Returns Project Id and Project Key

      const formattedPath = formatPath(path);
      const urlPath = url
        ? url
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
          process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
        ? `https://seo-manager-website.vercel.app/api/${version}/${formattedPath}`
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test"
        ? `http://localhost:3001/api/${version}/${formattedPath}`
        : `https://seo-manager-website-git-testing-shadow-republic.vercel.app/api/${version}/${formattedPath}`;

      let callHeaders = {
        X_ProjectId: initData?.projectId,
        X_ProjectKey: initData?.projectKey
      };
      if (headers) {
        callHeaders = { ...callHeaders, ...headers };
      }
      const response = await axios({
        method: method || "post",
        url: urlPath,
        data: data || {},
        headers: callHeaders
      });
      if (!response?.data?.results) {
        return reject({
          results: false,
          error: false,
          message: "Not Successful"
        });
      }
      return resolve({ results: response?.data?.results });
    } catch (err) {
      return reject({ results: false, error: err });
    }
  });
};

const formatPath = (path) => {
  let newPath = path;
  if (newPath[0] === "/") {
    newPath = newPath.replace("/", "");
  }
  return newPath;
};

import axios from "axios";
import { returnKey } from "./Init";

const version: string = "v1";

export const serverCall = (
  path: string,
  method: any = "put",
  data?: any,
  url?: string,
  headers?: object
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData: any = returnKey(); //Returns Project Id and Project Key
      if (!initData) {
        return reject({ results: false, error: "SEO Manager not initialized" });
      }
      const formattedPath = formatPath(path);
      const urlPath = url
        ? url
        : process.env.NODE_ENV === "production"
        ? `https://seo-manager-website.vercel.app/api/${version}/${formattedPath}`
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

const formatPath = (path: string) => {
  let newPath = path;
  if (newPath[0] === "/") {
    newPath = newPath.replace("/", "");
  }
  return newPath;
};

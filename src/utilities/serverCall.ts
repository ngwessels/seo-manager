import axios, { Method } from "axios";
import { returnKey } from "./setupInit";

// const version = "v1";

export const serverCall = (
  path: string,
  method: string = "put",
  data: any,
  url?: string,
  headers?: any
): any => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData = returnKey(); //Returns Project Id and Project Key
      if (!initData?.projectId) {
        return reject({ results: false, error: "Project Id is required" });
      }
      const formattedPath = formatPath(path);
      const urlPath = url
        ? url
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
          process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
        ? `https://v1.seomanager.dev/${formattedPath}`
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test"
        ? `http://localhost:3002/${formattedPath}`
        : `https://v1-testing.seomanager.dev/${formattedPath}`;
      let callHeaders = {
        X_ProjectId: initData?.projectId,
        X_ProjectKey: initData?.projectKey || ""
      };
      if (headers) {
        callHeaders = { ...callHeaders, ...headers };
      }
      const response = await axios(urlPath, {
        method: method as Method,
        data: data || {},
        headers: callHeaders
      });
      return resolve({
        ...(response?.data || {}),
        results: response?.data?.results,
        statusCode: response.status
      });
    } catch (err: any) {
      console.log("SERVER CALL ERROR:", err);
      return resolve({
        ...(err?.response?.data || {}),
        results: false,
        data: err?.response?.data,
        statusCode: err.response.status
      });
    }
  });
};

export const serverSecretCall = (
  path: string,
  method: "put" | "post" = "put",
  data: any,
  url?: string,
  headers?: any
): any => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData = returnKey(); //Returns Project Id and Project Key

      if (!initData?.projectId) {
        return reject({ results: false, error: "Project Id is required" });
      }
      if (!initData?.secretKey) {
        return reject({
          results: false,
          error: "Project Secret Key is required"
        });
      }

      const formattedPath = formatPath(path);
      const urlPath = url
        ? url
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
          process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
        ? `https://v1.seomanager.dev/${formattedPath}`
        : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test"
        ? `http://localhost:3002/${formattedPath}`
        : `https://v1-testing.seomanager.dev/${formattedPath}`;
      let callHeaders = {
        X_ProjectId: initData?.projectId,
        X_ProjectKey: initData?.projectKey || "",
        X_ProjectSecretKey: initData?.secretKey || ""
      };
      if (headers) {
        callHeaders = { ...callHeaders, ...headers };
      }
      const response = await axios(urlPath, {
        method: method as Method,
        url: urlPath,
        data: data || {},
        headers: callHeaders
      });
      return resolve({
        ...(response?.data || {}),
        results: response?.data?.results,
        error: response?.data?.error || false,
        message: response?.data?.message || "Successful",
        statusCode: response.status
      });
    } catch (err: any) {
      console.log("SERVER SECRET CALL ERROR:", err);
      return resolve({
        ...(err?.response?.data || {}),
        results: err?.response?.data?.results || false,
        error: err?.response?.data?.error || true,
        message:
          err?.response?.data?.message ||
          err?.response?.data ||
          "There was an error on our end! Please try again in a few minutes!",
        statusCode: err.response.status
      });
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

//Firebase
import firebase from "../firebase";
import { getAuth, getIdToken } from "firebase/auth";
const auth = getAuth(firebase);

import { serverCall } from "./serverCall.js";

export const fetch = (path, request = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (process.browser) {
        throw {
          error:
            "This function is only allowed to be called in a server environment, not in the client. If you are using NextJS this belong in getServerSideProps or getStaticProps."
        };
      }
      if (!path) {
        throw { error: "You must pass page path!" };
      }
      console.log("REQUEST:", request?.headers);
      const { results, error } = await serverCall("/seo/server_get", "put", {
        path,
        headers: request?.headers || {}
      });
      if (!results) {
        return resolve({
          results: false,
          error: error,
          message: "No SEO data for this page found"
        });
      }
      return resolve({ results });
    } catch (err) {
      return resolve({ results: false, error: err.error });
    }
  });
};

export const getUserToken = () => {
  return new Promise(async (resolve, reject) => {
    const token = getIdToken(auth.currentUser, true);
    return resolve(token);
  });
};

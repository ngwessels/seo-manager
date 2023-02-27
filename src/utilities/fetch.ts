import firebase from "../firebase";
import { getAuth, getIdToken } from "firebase/auth";
const auth: any = getAuth(firebase);

import { serverSecretCall } from "./serverCall";

export const fetch = (
  path: string,
  headers: any = {}
): Promise<{ results: boolean; error: string; message: string }> => {
  return new Promise(async (resolve) => {
    try {
      if (typeof window !== "undefined") {
        throw {
          error:
            "This function is only allowed to be called in a server environment, not in the client. If you are using NextJS this belong in getServerSideProps or getStaticProps."
        };
      }

      if (!path) {
        throw { error: "You must pass page path!" };
      }
      const { results, error } = await serverSecretCall(
        "/seo/server_get",
        "put",
        {
          path,
          headers: headers || {}
        }
      );
      if (!results) {
        return resolve({
          results: false,
          error: error,
          message: "No SEO data for this page found"
        });
      }
      return resolve({ results, error: "", message: "Successful" });
    } catch (err: any) {
      return resolve({
        results: false,
        error: err.error,
        message: "Not Successful"
      });
    }
  });
};

export const getUserToken = (): Promise<string> => {
  return new Promise(async (resolve) => {
    const token = getIdToken(auth.currentUser, true);
    return resolve(token);
  });
};

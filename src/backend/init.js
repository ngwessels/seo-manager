import { SEOinitialize } from "../utilities/setupInit";
import { fetch } from "../utilities/fetch";
import { serverSecretCall } from "../utilities/serverCall";
import { returnKey } from "../utilities/setupInit";

export const SEOInit = ({ projectId, projectKey, secretKey }) => {
  SEOinitialize({ projectId, projectKey, secretKey });
};

export const fetchSEO = (path) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(path);
    return resolve(data);
  });
};

export const backendValidation = (queueId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData = returnKey(); //Returns Project Id and Project Key
      if (!initData?.secretKey) {
        throw {
          error:
            "Please add a secretKey by calling the SEOInit function SEOInit({secretKey: '<<Add Value Here>>'}). Make sure you initialize this in your Api, not _app.js!"
        };
      }
      if (!initData?.projectId) {
        throw {
          error:
            "Please add a projectId by calling the SEOInit function SEOInit({projectId: '<<Add Value Here>>'}). Make sure you initialize this in your Api, not _app.js!"
        };
      }
      const response = await serverSecretCall("/backend/validate", "put", {
        queueId
      });
      return resolve(response);
    } catch (err) {
      return resolve({
        results: false,
        error: err?.data?.error || err?.error || "Something went wrong"
      });
    }
  });
};

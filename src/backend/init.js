import { SEOinitialize } from "../utilities/setupInit";
import { fetch } from "../utilities/fetch";

export const init = (projectId, projectKey, secretKey) => {
  SEOinitialize({ projectId, projectKey, secretKey });
};

export const fetchSEO = (path) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(path);
    return resolve(data);
  });
};

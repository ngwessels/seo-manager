import { SEOinitialize } from "../utilities/setupInit";
import { fetch } from "../utilities/fetch";
import { serverSecretCall } from "../utilities/serverCall";
import { returnKey } from "../utilities/setupInit";

export const SEOInit = ({ projectId, projectKey, secretKey }) => {
  SEOinitialize({ projectId, projectKey, secretKey });
};

export const fetchSEO = (path, headers = {}) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(path, headers);
    return resolve(data);
  });
};

export const backendValidation = (queueId) => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
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

export const checkBackendKeys = () => {
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
};

type PageIdentifiers = {
  pageId?: string;
  page?: string;
};
type Image = {
  url: string;
  fileId?: string;
  isExternal: boolean;
};
type SEO = {
  path?: string;
  description?: string;
  follow?: boolean;
  index?: boolean;
  title?: string;
  changeFreq?: "weekly" | "monthly" | "daily";
  keywordsArray?: [];
  priority?:
    | "1"
    | "0.9"
    | "0.8"
    | "0.7"
    | "0.6"
    | "0.5"
    | "0.4"
    | "0.3"
    | "0.2"
    | "0.1";
  ldJSON?: string;
  image?: Image;
};

type Options = {
  upsert?: boolean;
};

export const insertSeoPage = (
  pageIdentifiers: PageIdentifiers,
  pageSEO: SEO,
  options: Options
) => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend/seo/insert", "post", {
        pageIdentifiers,
        pageSEO,
        options
      });
      return resolve(response);
    } catch (err) {
      console.error(err);
      return resolve({
        results: false,
        error: err?.data?.error || err?.error || "Something went wrong"
      });
    }
  });
};

export const updateSeoPage = (
  pageIdentifiers: PageIdentifiers,
  pageSEO: SEO,
  options: Options
) => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend/seo/update", "put", {
        pageIdentifiers,
        pageSEO,
        options
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

export const deleteSeoPage = (pageIdentifiers: PageIdentifiers) => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend/seo/delete", "post", {
        pageIdentifiers
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

export const getSeoPage = (pageIdentifiers: PageIdentifiers) => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend/seo/get", "post", {
        pageIdentifiers
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

export const getSeoPages = (pageIdentifiers: PageIdentifiers) => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall(
        "backend/seo/getSeoPages",
        "post",
        {
          pageIdentifiers
        }
      );
      return resolve(response);
    } catch (err) {
      return resolve({
        results: false,
        error: err?.data?.error || err?.error || "Something went wrong"
      });
    }
  });
};

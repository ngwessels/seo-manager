import { SEOinitialize } from "../utilities/setupInit";
import { fetch } from "../utilities/fetch";
import { serverSecretCall } from "../utilities/serverCall";

// type PageIdentifiers = {
//   pageId?: string;
//   page?: string;
// };
// type Image = {
//   url: string;
//   fileId?: string;
//   isExternal: boolean;
// };
// type SEO = {
//   path?: string;
//   description?: string;
//   follow?: string;
//   index?: string;
//   title?: string;
//   changeFreq?: "weekly" | "monthly" | "daily";
//   keywordsArray?: [];
//   priority?:
//     | "1"
//     | "0.9"
//     | "0.8"
//     | "0.7"
//     | "0.6"
//     | "0.5"
//     | "0.4"
//     | "0.3"
//     | "0.2"
//     | "0.1";
//   ldJSON?: string;
//   image?: Image;
// };

// type Options = {
//   upsert?: boolean;
// };

// type SEOINIT = {
//   projectId: string;
//   projectKey: string;
//   secretKey?: string;
// };

export const SEOInit = (keys) => {
  SEOinitialize(keys);
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
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
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

/**
 * * @name insertSeoPage
 * @function
 * @param {Object[]} pageIdentifiers - Array of page paths
 * @param {string} pageIdentifiers[].path - SEO Page path
 * @param {Object[]} pageSEO - Array of page SEO information (must be in same order as pageIdentifiers)
 * @param {string} pageSEO[].path - SEO Page path (SEO page path you want set)
 * @param {string} pageSEO[].title - SEO Page title
 * @param {string} pageSEO[].description - SEO Page description
 */
export function insertSeoPage(pageIdentifiers, pageSEO) {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend/seo/insert", "post", {
        pageIdentifiers,
        pageSEO
      });
      return resolve(response);
    } catch (err) {
      console.error(err);
      return resolve({
        results: false,
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
      });
    }
  });
}

export const updateSeoPage = (pageIdentifiers, pageSEO, options) => {
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
      console.log("Error:", err);
      return resolve({
        results: false,
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
      });
    }
  });
};

export const deleteSeoPage = (pageIdentifiers) => {
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
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
      });
    }
  });
};

// export const getSeoPage = (pageIdentifiers: PageIdentifiers) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       checkBackendKeys(); //Checks keys
//       const response = await serverSecretCall("backend/seo/get", "post", {
//         pageIdentifiers
//       });
//       return resolve(response);
//     } catch (err) {
//       return resolve({
//         results: false,
//         error: true,
//         message: err?.data?.error || err?.error || "Something went wrong"
//       });
//     }
//   });
// };

export const getSeoPages = (pageIdentifiers) => {
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
        error: true,
        message: err?.data?.error || err?.error || "Something went wrong"
      });
    }
  });
};

// type ReturnKey = {
//   secretKey?: string;
//   projectKey: string;
//   projectId: string;
// };
const returnKey = () => {
  let object = {};
  let objectValid = false;
  if (process.env.SEO_MANAGER_MODULE_SECRETKEY) {
    object.secretKey = process.env.SEO_MANAGER_MODULE_SECRETKEY;
    objectValid = true;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTKEY) {
    object.projectKey = process.env.SEO_MANAGER_MODULE_PROJECTKEY;
    objectValid = true;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTID) {
    object.projectId = process.env.SEO_MANAGER_MODULE_PROJECTID;
    objectValid = true;
  }

  return object;
};

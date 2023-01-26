import { getApps, initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const SEOinitialize = keys => {
  const init = returnKey$1() || {};
  let object = {
    ...init
  };
  const {
    projectId,
    projectKey,
    secretKey
  } = keys;
  if (projectId) {
    object.projectId = projectId;
    process.env.SEO_MANAGER_MODULE_PROJECTID = projectId;
  }
  if (projectKey) {
    object.projectKey = projectKey;
    process.env.SEO_MANAGER_MODULE_PROJECTKEY = projectKey;
  }
  if (secretKey) {
    object.secretKey = secretKey;
    process.env.SEO_MANAGER_MODULE_SECRETKEY = secretKey;
  }
  if (!object?.projectId) {
    throw "Please add a projectId by calling the SEOInit function SEOInit({projectId: '<<Add Value Here>>'})";
  }
};
const returnKey$1 = () => {
  let object = {};
  if (process.env.SEO_MANAGER_MODULE_SECRETKEY) {
    object.secretKey = process.env.SEO_MANAGER_MODULE_SECRETKEY;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTKEY) {
    object.projectKey = process.env.SEO_MANAGER_MODULE_PROJECTKEY;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTID) {
    object.projectId = process.env.SEO_MANAGER_MODULE_PROJECTID;
  }
  return object;
};

const firebaseConfig = process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" && process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development" ? {
  apiKey: "AIzaSyDPjpRmobrdUtIY3hIaNoyox7alxYJH_B8",
  authDomain: "seo-manager-live.firebaseapp.com",
  projectId: "seo-manager-live",
  storageBucket: "seo-manager-live.appspot.com",
  messagingSenderId: "510256510596",
  appId: "1:510256510596:web:eae1ccc42cb103b8a7f4d1",
  measurementId: "G-RED1HCM49W"
} : {
  apiKey: "AIzaSyBD6KEJFm2SVguRDEiqufIlRo5HuHu0IZg",
  authDomain: "seo-manager-test.firebaseapp.com",
  projectId: "seo-manager-test",
  storageBucket: "seo-manager-test.appspot.com",
  messagingSenderId: "682714204028",
  appId: "1:682714204028:web:a782b9da96ce811ee606f9",
  measurementId: "G-PYZDK47B2M"
};
let app;
const appFoundIndex = getApps()?.findIndex(a => {
  if (a?.name === "seo-manager") {
    return true;
  }
});
if (appFoundIndex < 0) {
  app = initializeApp(firebaseConfig, "seo-manager");
} else {
  app = getApp("seo-manager");
}
var firebase = app;

// import axios from "axios";
const axios = require("axios");
const version = "v1";
const serverCall = (path, method = "put", data, url, headers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData = returnKey$1(); //Returns Project Id and Project Key
      if (!initData?.projectId) {
        return reject({
          results: false,
          error: "Project Id is required"
        });
      }
      const formattedPath = formatPath(path);
      const urlPath = url ? url : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" && process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development" ? `https://seomanager.dev/api/${version}/${formattedPath}` : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test" ? `http://localhost:3001/api/${version}/${formattedPath}` : `https://testing.seomanager.dev/api/${version}/${formattedPath}`;
      let callHeaders = {
        X_ProjectId: initData?.projectId,
        X_ProjectKey: initData?.projectKey
      };
      if (headers) {
        callHeaders = {
          ...callHeaders,
          ...headers
        };
      }
      const response = await axios({
        method: method || "post",
        url: urlPath,
        data: data || {},
        headers: callHeaders
      });
      if (!response?.data?.results) {
        return resolve(response?.data);
      }
      return resolve({
        results: response?.data?.results
      });
    } catch (err) {
      return resolve({
        results: false,
        data: err?.response?.data
      });
    }
  });
};
const serverSecretCall = (path, method = "put", data, url, headers) => {
  return new Promise(async (resolve, reject) => {
    try {
      const initData = returnKey$1(); //Returns Project Id and Project Key

      if (!initData?.projectId) {
        return reject({
          results: false,
          error: "Project Id is required"
        });
      }
      if (!initData?.secretKey) {
        return reject({
          results: false,
          error: "Project Secret Key is required"
        });
      }
      const formattedPath = formatPath(path);
      const urlPath = url ? url : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" && process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development" ? `https://seomanager.dev/api/${version}/${formattedPath}` : process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test" ? `http://localhost:3001/api/${version}/${formattedPath}` : `https://testing.seomanager.dev/api/${version}/${formattedPath}`;
      let callHeaders = {
        X_ProjectId: initData?.projectId,
        X_ProjectKey: initData?.projectKey,
        X_ProjectSecretKey: initData?.secretKey
      };
      if (headers) {
        callHeaders = {
          ...callHeaders,
          ...headers
        };
      }
      const response = await axios({
        method: method || "post",
        url: urlPath,
        data: data || {},
        headers: callHeaders
      });
      return resolve(response?.data);
    } catch (err) {
      return resolve({
        results: err?.response?.data?.results || false,
        error: err?.response?.data?.error || true,
        message: err?.response?.data?.message || err?.response?.data || "There was an error on our end! Please try again in a few mintues!"
      });
    }
  });
};
const formatPath = path => {
  let newPath = path;
  if (newPath[0] === "/") {
    newPath = newPath.replace("/", "");
  }
  return newPath;
};

//Firebase
getAuth(firebase);
const fetch = (path, request = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (process.browser) {
        throw {
          error: "This function is only allowed to be called in a server environment, not in the client. If you are using NextJS this belong in getServerSideProps or getStaticProps."
        };
      }
      if (!path) {
        throw {
          error: "You must pass page path!"
        };
      }
      console.log("REQUEST:", request?.headers);
      const {
        results,
        error
      } = await serverCall("/seo/server_get", "put", {
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
      return resolve({
        results
      });
    } catch (err) {
      return resolve({
        results: false,
        error: err.error
      });
    }
  });
};

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

const SEOInit = keys => {
  SEOinitialize(keys);
};
const fetchSEO = (path, headers = {}) => {
  return new Promise(async (resolve, reject) => {
    const data = await fetch(path, headers);
    return resolve(data);
  });
};
const backendValidation = queueId => {
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
const checkBackendKeys = () => {
  const initData = returnKey(); //Returns Project Id and Project Key
  if (!initData?.secretKey) {
    throw {
      error: "Please add a secretKey by calling the SEOInit function SEOInit({secretKey: '<<Add Value Here>>'}). Make sure you initialize this in your Api, not _app.js!"
    };
  }
  if (!initData?.projectId) {
    throw {
      error: "Please add a projectId by calling the SEOInit function SEOInit({projectId: '<<Add Value Here>>'}). Make sure you initialize this in your Api, not _app.js!"
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
function insertSeoPage(pageIdentifiers, pageSEO) {
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
const updateSeoPage = (pageIdentifiers, pageSEO, options) => {
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
const deleteSeoPage = pageIdentifiers => {
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

const getSeoPages = pageIdentifiers => {
  return new Promise(async (resolve, reject) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend/seo/getSeoPages", "post", {
        pageIdentifiers
      });
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
  if (process.env.SEO_MANAGER_MODULE_SECRETKEY) {
    object.secretKey = process.env.SEO_MANAGER_MODULE_SECRETKEY;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTKEY) {
    object.projectKey = process.env.SEO_MANAGER_MODULE_PROJECTKEY;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTID) {
    object.projectId = process.env.SEO_MANAGER_MODULE_PROJECTID;
  }
  return object;
};

export { SEOInit, backendValidation, checkBackendKeys, deleteSeoPage, fetchSEO, getSeoPages, insertSeoPage, updateSeoPage };

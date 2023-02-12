import { fetch } from "../utilities/fetch";
import { serverSecretCall } from "../utilities/serverCall";
import {
  PageIdentifiers,
  PageSEO,
  FetchSEOHeaders,
  PageOptions
} from "../types";

//SEO DATA FETCH
/**
 * * @name fetchSEO
 * @function
 * @param {string} path - Path to SEO page
 * @param {FetchSEOHeaders} [meta] - {request: context?.req}
 */
export const fetchSEO = (path: string, meta: FetchSEOHeaders = {}) => {
  return new Promise(async (resolve) => {
    const data = await fetch(path, meta?.request?.headers || {});
    return resolve(data);
  });
};

//VALIDATION
/**
@name backendValidation
@function
@param {any} body - Your req.body
*/
export const backendValidation = (body: any) => {
  return new Promise(async (resolve) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("/backend_api/validate", "put", {
        encrypted: body?.data?.encrypted || {}
      });
      return resolve(response);
    } catch (err: any) {
      return resolve({
        results: false,
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
      });
    }
  });
};

export const checkBackendKeys = () => {
  const initData: any = returnKey(); //Returns Project Id and Project Key
  if (!initData?.secretKey) {
    throw {
      error:
        "Please add a secretKey by calling the SEOInit function SEOInit({secretKey: <<Add Value Here>>. Make sure you initialize this in your Api, not _app.js!"
    };
  }
  if (!initData?.projectId) {
    throw {
      error:
        "Please add a projectId by calling the SEOInit function SEOInit({projectId: <<Add Value Here>>. Make sure you initialize this in your Api, not _app.js!"
    };
  }
};

//BACKEND API

//Insert a new page
/**
@name insertSeoPage
@function
@param {PageIdentifiers[]} pageIdentifiers - Array of {path [Required], pageId [Optional]}
@param {PageSEO[]} pageSEO - Array of {title, description}
*/
export function insertSeoPage(
  pageIdentifiers: PageIdentifiers[],
  pageSEO: PageSEO[]
) {
  return new Promise(async (resolve) => {
    try {
      if (pageIdentifiers?.length > 50) {
        return resolve({
          results: false,
          message: "You are limited to 50 inserts at the same time!",
          error: true
        });
      }
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall(
        "backend_api/seo/insert",
        "post",
        {
          pageIdentifiers,
          pageSEO
        }
      );
      return resolve(response);
    } catch (err: any) {
      console.error(err);
      return resolve({
        results: false,
        message: err?.data?.message || err?.message || "Something went wrong",
        error: err?.data?.error || err?.error || "Something went wrong"
      });
    }
  });
}

//Update Existing pages or insert new page
/**
@name updateSeoPage - Update a batch of SEO Pages
@function 
@param {PageIdentifiers[]} pageIdentifiers - Array of {path [Required], pageId [Optional]}
@param {PageSEO[]} pageSEO - Array of {title, description}
@param {PageOptions} options - additional options for the batch update
*/
export const updateSeoPage = (
  pageIdentifiers: PageIdentifiers[],
  pageSEO: PageSEO[],
  options: PageOptions
) => {
  return new Promise(async (resolve) => {
    try {
      if (pageIdentifiers?.length > 50) {
        return resolve({
          results: false,
          message: "You are limited to 50 updates at the same time!",
          error: true
        });
      }
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall("backend_api/seo/update", "put", {
        pageIdentifiers,
        pageSEO,
        options
      });
      return resolve(response);
    } catch (err: any) {
      console.log("Error:", err);
      return resolve({
        results: false,
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
      });
    }
  });
};

//Delete existing pages
/**
@name deleteSeoPage
@function
@param {PageIdentifiers[]} pageIdentifiers - Array of {path [Required], pageId [Optional]}
*/
export const deleteSeoPage = (pageIdentifiers: PageIdentifiers[]) => {
  return new Promise(async (resolve) => {
    try {
      if (pageIdentifiers?.length > 50) {
        return resolve({
          results: false,
          message: "You are limited to 50 deletes at the same time!",
          error: true
        });
      }
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall(
        "backend_api/seo/delete",
        "post",
        {
          pageIdentifiers
        }
      );
      return resolve(response);
    } catch (err: any) {
      return resolve({
        results: false,
        message: err?.data?.error || err?.error || "Something went wrong",
        error: true
      });
    }
  });
};

//Get pages that fit identifiers
/**
@name getSeoPages
@function
@param {PageIdentifiers} pageIdentifiers - Object of {path [Required], pageId [Optional]}
*/
export const getSeoPages = (pageIdentifiers: PageIdentifiers): Promise<any> => {
  return new Promise(async (resolve) => {
    try {
      checkBackendKeys(); //Checks keys
      const response = await serverSecretCall(
        "backend_api/seo/getSeoPages",
        "post",
        {
          pageIdentifiers
        }
      );
      return resolve(response);
    } catch (err: any) {
      return resolve({
        results: false,
        error: true,
        message: err?.data?.error || err?.error || "Something went wrong"
      });
    }
  });
};

//RETURN KEYS
const returnKey = (): {
  secretKey?: string;
  projectKey?: string;
  projectId?: string;
} => {
  let object: { secretKey?: string; projectKey?: string; projectId?: string } =
    {};
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

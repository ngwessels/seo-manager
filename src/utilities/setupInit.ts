import { SEOInitKeys } from "../types";

//INITIALIZE PROJECT
/**
 * * @name SEOInit
 * @function
 * @param {SEOInitKeys} keys - Object containing secretKey, projectId, and projectKey
 */
export const SEOInit = (keys: SEOInitKeys): boolean => {
  const init = returnKey() || {};
  let object = { ...init };
  const { projectId, projectKey, secretKey } = keys;
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
  return true;
};

export const returnKey = (): {
  secretKey?: string;
  projectKey?: string;
  projectId?: string;
} => {
  let object: any = {};
  // let objectValid = false;
  if (process.env.SEO_MANAGER_MODULE_SECRETKEY) {
    object.secretKey = process.env.SEO_MANAGER_MODULE_SECRETKEY;
    // objectValid = true;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTKEY) {
    object.projectKey = process.env.SEO_MANAGER_MODULE_PROJECTKEY;
    // objectValid = true;
  }
  if (process.env.SEO_MANAGER_MODULE_PROJECTID) {
    object.projectId = process.env.SEO_MANAGER_MODULE_PROJECTID;
    // objectValid = true;
  }

  return object;
};

export const setProject = (project: any) => {
  process.env.SEO_MANAGER_MODULE_PROJECT = JSON.stringify(project);
};

export const returnProject = (): any | null => {
  const data = process.env.SEO_MANAGER_MODULE_PROJECT;
  return data ? JSON.parse(data) : null;
};

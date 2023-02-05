import { SEOInitKeys } from "./types";

//INITIALIZE PROJECT
/**
 * * @name SEOInit
 * @function
 * @param {SEOInitKeys} keys - Object containing secretKey, projectId, and projectKey
 */

const SEOInit = (keys: SEOInitKeys): boolean => {
  let object: SEOInitKeys = {
    projectId: ""
  };
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

export default SEOInit;

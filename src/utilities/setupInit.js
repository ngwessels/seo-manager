export const SEOinitialize = ({ projectId, projectKey, secretKey }) => {
  const init = returnKey() || {};
  let object = { ...init };
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

export const returnKey = () => {
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

  return objectValid ? object : false;
};

export const setProject = (project) => {
  process.env.SEO_MANAGER_MODULE_PROJECT = JSON.stringify(project);
};

export const returnProject = () => {
  const data = process.env.SEO_MANAGER_MODULE_PROJECT;
  return data ? JSON.parse(data) : null;
};

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

export const setProjectPlan = (projectPlan: any) => {
  process.env.SEO_MANAGER_MODULE_PROJECTPLAN = JSON.stringify(projectPlan);
};

export const returnProjectPlan = (): any | null => {
  const data = process.env.SEO_MANAGER_MODULE_PROJECTPLAN;
  return data ? JSON.parse(data) : null;
};

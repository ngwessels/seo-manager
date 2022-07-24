// const NodeCache = require("node-cache");
import NodeCache from "node-cache";
const myCache = new NodeCache();

export const SEOinitialize = ({ projectId, projectKey, secretKey }) => {
  const object = { projectKey, projectId, secretKey };
  myCache.set("init", object, 10000);
};

export const returnKey = () => {
  const object = myCache.get("init");
  if (object) {
    return object;
  }
  return false;
};

export const setProject = (project) => {
  myCache.set("project", project, 10000);
};

export const returnProject = () => {
  const object = myCache.get("project");
  return object;
};

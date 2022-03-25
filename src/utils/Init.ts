import NodeCache from "node-cache";
const myCache = new NodeCache();

export const SEOinitialize = (projectId: string, projectKey: string) => {
  const object = { projectKey, projectId };
  myCache.set("init", object, 10000);
};

export const returnKey = () => {
  const object = myCache.get("init");
  if (object) {
    return object;
  }
  return false;
};

/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
//Firebase
import firebase from "src/firebase";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebase);

//Project Plan
import { returnProjectPlan, setProjectPlan } from "src/utilities/setupInit";

export const hideModal = () => {
  document.getElementById("close-seo-manager")?.click();
};

export const openModal = () => {
  document.getElementById("open-seo-manager")?.click();
};

export const formattedFileName = (data) => {
  let path = "";
  if (data.path.length === 1 && data.path === "/") {
    return "index";
  }
  for (let idx in data.path) {
    let int = parseInt(idx);
    if (data.path[int] === "/" && int !== 0 && int !== data.path.length - 1) {
      path += ".";
    } else if (data.path[int] !== "/") {
      path += data.path[int];
    }
  }
  return path;
};

export const addFiles = (e, validContentType, projectPlan) => {
  const payAsYouGo = projectPlan?.payAsYouGo;
  const currentStorageUsage = projectPlan?.usageReport?.storage_used || 0;
  const currentStorageLimit = projectPlan?.limitations?.storage_used;
  let additionalStorage = 0;

  let photos = [];
  for (let idx in e.target.files) {
    let file = e.target.files[idx];
    if (file && file.type) {
      const { name, size, type } = e.target.files[idx];
      additionalStorage += parseInt(size);
      file.localURL = URL.createObjectURL(file);
      photos.push({
        object: file,
        name: file.name
      });
    }
  }
  const newStorageUsed = currentStorageUsage + additionalStorage;
  if (
    !payAsYouGo &&
    newStorageUsed > currentStorageLimit &&
    currentStorageLimit !== true
  ) {
    return {
      error:
        "You cannot add these files as you have hit your storage limit. Consider upgrading your account!"
    };
  }
  if (!projectPlan?.usageReport) {
    projectPlan.usageReport = {};
  }
  if (!projectPlan?.usageReport?.storage_used) {
    projectPlan.usageReport.storage_used = 0;
  }
  projectPlan.usageReport.storage_used += additionalStorage;
  setProjectPlan(projectPlan);
  return { results: photos };
};

export const authSignOut = async () => {
  //Signs out user
  return await signOut(auth);
};

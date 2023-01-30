/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
//Firebase
// import { firebase } from "../../firebase";
import firebase from "src/firebase";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(firebase);

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

export const addFiles = (e, validContentTypes) => {
  let photos = [];
  for (let idx in e.target.files) {
    let file = e.target.files[idx];
    if (file && file.type) {
      const { name, size, type } = e.target.files[idx];
      // if (!type || !validContentTypes.includes(type)) {
      //   return {
      //     error: "That file is not supported. Only .jpeg, .jpg, and .png",
      //     results: false
      //   };
      // }
      file.localURL = URL.createObjectURL(file);
      photos.push({
        object: file,
        name: file.name
      });
    }
  }
  return { results: photos };
};

export const authSignOut = async () => {
  //Signs out user
  return await signOut(auth);
};

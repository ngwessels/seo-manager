import { initializeApp } from "firebase/app";

const firebaseConfig =
  process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
  process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
    ? {
        apiKey: "AIzaSyDPjpRmobrdUtIY3hIaNoyox7alxYJH_B8",
        authDomain: "seo-manager-live.firebaseapp.com",
        projectId: "seo-manager-live",
        storageBucket: "seo-manager-live.appspot.com",
        messagingSenderId: "510256510596",
        appId: "1:510256510596:web:eae1ccc42cb103b8a7f4d1",
        measurementId: "G-RED1HCM49W"
      }
    : {
        apiKey: "AIzaSyBD6KEJFm2SVguRDEiqufIlRo5HuHu0IZg",
        authDomain: "seo-manager-test.firebaseapp.com",
        projectId: "seo-manager-test",
        storageBucket: "seo-manager-test.appspot.com",
        messagingSenderId: "682714204028",
        appId: "1:682714204028:web:a782b9da96ce811ee606f9",
        measurementId: "G-PYZDK47B2M"
      };

const firebase = initializeApp(firebaseConfig, "seo-manager");

export default firebase;

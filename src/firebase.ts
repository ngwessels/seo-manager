/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/indent */
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig =
  process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test"
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

const firebase: FirebaseApp = initializeApp(
  firebaseConfig,
  "nextjs-seo-manager"
);

export { firebase };

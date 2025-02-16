import{getApps as e,initializeApp as r,getApp as o}from"firebase/app";import{getAuth as t}from"firebase/auth";import n from"axios";const s=()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e},i=e=>{process.env.SEO_MANAGER_MODULE_PROJECT=JSON.stringify(e)},a=()=>{const e=process.env.SEO_MANAGER_MODULE_PROJECT;return e?JSON.parse(e):null},d=e=>{process.env.SEO_MANAGER_MODULE_PROJECTPLAN=JSON.stringify(e)},l=()=>{const e=process.env.SEO_MANAGER_MODULE_PROJECTPLAN;return e?JSON.parse(e):null};function u(e,r,o,t){return new(o||(o=Promise))((function(n,s){function i(e){try{d(t.next(e))}catch(e){s(e)}}function a(e){try{d(t.throw(e))}catch(e){s(e)}}function d(e){var r;e.done?n(e.value):(r=e.value,r instanceof o?r:new o((function(e){e(r)}))).then(i,a)}d((t=t.apply(e,r||[])).next())}))}var v;"function"==typeof SuppressedError&&SuppressedError;const c="Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?{apiKey:"AIzaSyDPjpRmobrdUtIY3hIaNoyox7alxYJH_B8",authDomain:"seo-manager-live.firebaseapp.com",projectId:"seo-manager-live",storageBucket:"seo-manager-live.appspot.com",messagingSenderId:"510256510596",appId:"1:510256510596:web:eae1ccc42cb103b8a7f4d1",measurementId:"G-RED1HCM49W"}:{apiKey:"AIzaSyBD6KEJFm2SVguRDEiqufIlRo5HuHu0IZg",authDomain:"seo-manager-test.firebaseapp.com",projectId:"seo-manager-test",storageBucket:"seo-manager-test.appspot.com",messagingSenderId:"682714204028",appId:"1:682714204028:web:a782b9da96ce811ee606f9",measurementId:"G-PYZDK47B2M"};let E;E=(null===(v=e())||void 0===v?void 0:v.findIndex((e=>"seo-manager"===(null==e?void 0:e.name))))<0?r(c,"seo-manager"):o("seo-manager");const p=(e,r="put",o,t,i)=>new Promise(((a,d)=>u(void 0,void 0,void 0,(function*(){var l,u,v,c,E,p,g,m,O,S,f;try{const c=s();if(!(null==c?void 0:c.projectId))return d({results:!1,error:"Project Id is required"});if(!(null==c?void 0:c.secretKey))return d({results:!1,error:"Project Secret Key is required"});const E=_(e),p=t||("Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`https://v1.seomanager.dev/${E}`:"Test"===process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`http://localhost:3002/${E}`:`https://v1-testing.seomanager.dev/${E}`);let g={X_ProjectId:null==c?void 0:c.projectId,X_ProjectKey:(null==c?void 0:c.projectKey)||"",X_ProjectSecretKey:(null==c?void 0:c.secretKey)||""};i&&(g=Object.assign(Object.assign({},g),i));const m=yield n(p,{method:r,url:p,data:o||{},headers:g});return a(Object.assign(Object.assign({},(null==m?void 0:m.data)||{}),{results:null===(l=null==m?void 0:m.data)||void 0===l?void 0:l.results,error:(null===(u=null==m?void 0:m.data)||void 0===u?void 0:u.error)||!1,message:(null===(v=null==m?void 0:m.data)||void 0===v?void 0:v.message)||"Successful",statusCode:m.status}))}catch(e){return console.log("SERVER SECRET CALL ERROR:",e),a(Object.assign(Object.assign({},(null===(c=null==e?void 0:e.response)||void 0===c?void 0:c.data)||{}),{results:(null===(p=null===(E=null==e?void 0:e.response)||void 0===E?void 0:E.data)||void 0===p?void 0:p.results)||!1,error:(null===(m=null===(g=null==e?void 0:e.response)||void 0===g?void 0:g.data)||void 0===m?void 0:m.error)||!0,message:(null===(S=null===(O=null==e?void 0:e.response)||void 0===O?void 0:O.data)||void 0===S?void 0:S.message)||(null===(f=null==e?void 0:e.response)||void 0===f?void 0:f.data)||"There was an error on our end! Please try again in a few minutes!",statusCode:e.response.status}))}})))),_=e=>{let r=e;return"/"===r[0]&&(r=r.replace("/","")),r};t(E);const g=(e,r={})=>new Promise((o=>u(void 0,void 0,void 0,(function*(){var t;const n=yield((e,r={})=>new Promise((o=>u(void 0,void 0,void 0,(function*(){try{if("undefined"!=typeof window)throw{error:"This function is only allowed to be called in a server environment, not in the client. If you are using NextJS this belong in getServerSideProps or getStaticProps."};if(!e)throw{error:"You must pass page path!"};const{results:t,error:n}=yield p("/seo/server_get","put",{path:e,headers:r||{}});return o(t?{results:t,error:"",message:"Successful"}:{results:!1,error:n,message:"No SEO data for this page found"})}catch(e){return o({results:!1,error:e.error,message:"Not Successful"})}})))))(e,(null===(t=null==r?void 0:r.request)||void 0===t?void 0:t.headers)||{});return o((null==n?void 0:n.results)||{})})))),m=e=>new Promise((r=>u(void 0,void 0,void 0,(function*(){var o,t;try{O();const t=yield p("/backend_api/validate","put",{encrypted:(null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.encrypted)||{}});return r(t)}catch(e){return r({results:!1,message:(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.error)||(null==e?void 0:e.error)||"Something went wrong",error:!0})}})))),O=()=>{const e=A();if(!(null==e?void 0:e.secretKey))throw{error:"Please add a secretKey by calling the SEOInit function SEOInit({secretKey: <<Add Value Here>>. Make sure you initialize this in your Api, not _app.js!"};if(!(null==e?void 0:e.projectId))throw{error:"Please add a projectId by calling the SEOInit function SEOInit({projectId: <<Add Value Here>>. Make sure you initialize this in your Api, not _app.js!"}};function S(e){return new Promise((r=>u(this,void 0,void 0,(function*(){var o,t;try{if((null==e?void 0:e.length)>50)return r({results:!1,message:"You are limited to 50 inserts at the same time!",error:!0});O();const o=yield p("backend_api/seo/insert","post",{pageSEO:e});return r(o)}catch(e){return console.error(e),r({results:!1,message:(null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.message)||(null==e?void 0:e.message)||"Something went wrong",error:(null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.error)||(null==e?void 0:e.error)||"Something went wrong"})}}))))}const f=(e,r,o)=>new Promise((t=>u(void 0,void 0,void 0,(function*(){var n;try{if((null==e?void 0:e.length)>50)return t({results:!1,message:"You are limited to 50 updates at the same time!",error:!0});O();const n=yield p("backend_api/seo/update","put",{pageIdentifiers:e,pageSEO:r,options:o});return t(n)}catch(e){return console.log("Error:",e),t({results:!1,message:(null===(n=null==e?void 0:e.data)||void 0===n?void 0:n.error)||(null==e?void 0:e.error)||"Something went wrong",error:!0})}})))),y=e=>new Promise((r=>u(void 0,void 0,void 0,(function*(){var o;try{if((null==e?void 0:e.length)>50)return r({results:!1,message:"You are limited to 50 deletes at the same time!",error:!0});O();const o=yield p("backend_api/seo/delete","post",{pageIdentifiers:e});return r(o)}catch(e){return r({results:!1,message:(null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.error)||(null==e?void 0:e.error)||"Something went wrong",error:!0})}})))),h=e=>new Promise((r=>u(void 0,void 0,void 0,(function*(){var o;try{O();const o=yield p("backend_api/seo/getSeoPages","post",{pageIdentifiers:e});return r(o)}catch(e){return r({results:!1,error:!0,message:(null===(o=null==e?void 0:e.data)||void 0===o?void 0:o.error)||(null==e?void 0:e.error)||"Something went wrong"})}})))),A=()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e};export{m as backendValidation,O as checkBackendKeys,y as deleteSeoPage,g as fetchSEO,h as getSeoPages,S as insertSeoPage,s as returnKey,a as returnProject,l as returnProjectPlan,i as setProject,d as setProjectPlan,f as updateSeoPage};

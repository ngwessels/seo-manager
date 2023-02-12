"use strict";var e=require("react"),t=require("axios");function s(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=s(e),n=s(t);function o(e,t,s,r){return new(s||(s=Promise))((function(n,o){function a(e){try{i(r.next(e))}catch(e){o(e)}}function c(e){try{i(r.throw(e))}catch(e){o(e)}}function i(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,c)}i((r=r.apply(e,t||[])).next())}))}const a=(e,t="put",s,r,a)=>new Promise(((i,l)=>o(void 0,void 0,void 0,(function*(){var o,u,d;try{const u=(()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e})();if(!(null==u?void 0:u.projectId))return l({results:!1,error:"Project Id is required"});const d=c(e),E=r||("Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`https://v1.seomanager.dev/${d}`:"Test"===process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`http://localhost:3002/${d}`:`https://v1-testing.seomanager.dev/${d}`);let v={X_ProjectId:null==u?void 0:u.projectId,X_ProjectKey:(null==u?void 0:u.projectKey)||""};a&&(v=Object.assign(Object.assign({},v),a));const p=yield n.default(E,{method:t,data:s||{},headers:v});return i(Object.assign(Object.assign({},(null==p?void 0:p.data)||{}),{results:null===(o=null==p?void 0:p.data)||void 0===o?void 0:o.results,statusCode:p.status}))}catch(e){return console.log("SERVER CALL ERROR:",e),i(Object.assign(Object.assign({},(null===(u=null==e?void 0:e.response)||void 0===u?void 0:u.data)||{}),{results:!1,data:null===(d=null==e?void 0:e.response)||void 0===d?void 0:d.data,statusCode:e.response.status}))}})))),c=e=>{let t=e;return"/"===t[0]&&(t=t.replace("/","")),t};class i extends r.default.Component{static async getInitialProps({res:e,req:t}){e.setHeader("Content-Type","text/xml");try{const{results:s}=await a("/sitemap/","put",{path:t.url,headers:t?.headers||{}});e.write(s)}catch(e){console.error(e.error)}e.end()}}module.exports=i;
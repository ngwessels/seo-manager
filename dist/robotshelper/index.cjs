"use strict";var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=t(require("axios"));function n(e,t,s,n){return new(s||(s=Promise))((function(o,r){function a(e){try{i(n.next(e))}catch(e){r(e)}}function c(e){try{i(n.throw(e))}catch(e){r(e)}}function i(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,c)}i((n=n.apply(e,t||[])).next())}))}const o=(e,t="put",o,a,c)=>new Promise(((i,l)=>n(void 0,void 0,void 0,(function*(){var n,u,d;try{const u=(()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e})();if(!(null==u?void 0:u.projectId))return l({results:!1,error:"Project Id is required"});const d=r(e),E=a||("Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`https://v1.seomanager.dev/${d}`:"Test"===process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`http://localhost:3002/${d}`:`https://v1-testing.seomanager.dev/${d}`);let v={X_ProjectId:null==u?void 0:u.projectId,X_ProjectKey:(null==u?void 0:u.projectKey)||""};c&&(v=Object.assign(Object.assign({},v),c));const p=yield s.default(E,{method:t,data:o||{},headers:v});return i(Object.assign(Object.assign({},(null==p?void 0:p.data)||{}),{results:null===(n=null==p?void 0:p.data)||void 0===n?void 0:n.results,statusCode:p.status}))}catch(e){return console.log("SERVER CALL ERROR:",e),i(Object.assign(Object.assign({},(null===(u=null==e?void 0:e.response)||void 0===u?void 0:u.data)||{}),{results:!1,data:null===(d=null==e?void 0:e.response)||void 0===d?void 0:d.data,statusCode:e.response.status}))}})))),r=e=>{let t=e;return"/"===t[0]&&(t=t.replace("/","")),t};class a extends e.Component{static async getInitialProps({res:e,req:t}){e.setHeader("Content-Type","text/plain");try{const{results:s}=await o("/robots/","put",{headers:t?.headers||{}});e.write(s)}catch(e){console.error(e.error)}e.end()}}module.exports=a;
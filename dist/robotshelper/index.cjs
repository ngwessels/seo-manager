"use strict";var e=require("react");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=t(require("axios"));function r(e,t,o,r){return new(o||(o=Promise))((function(s,n){function l(e){try{d(r.next(e))}catch(e){n(e)}}function i(e){try{d(r.throw(e))}catch(e){n(e)}}function d(e){var t;e.done?s(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(l,i)}d((r=r.apply(e,t||[])).next())}))}const s=(e,t="put",s,l,i)=>new Promise(((d,a)=>r(void 0,void 0,void 0,(function*(){var r,u,c,v,E,p,_,O,R,A,y;try{const v=(()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e})();if(!(null==v?void 0:v.projectId))return a({results:!1,error:"Project Id is required"});if(!(null==v?void 0:v.secretKey))return a({results:!1,error:"Project Secret Key is required"});const E=n(e),p=l||("Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`https://v1.seomanager.dev/${E}`:"Test"===process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`http://localhost:3002/${E}`:`https://v1-testing.seomanager.dev/${E}`);let _={X_ProjectId:null==v?void 0:v.projectId,X_ProjectKey:(null==v?void 0:v.projectKey)||"",X_ProjectSecretKey:(null==v?void 0:v.secretKey)||""};i&&(_=Object.assign(Object.assign({},_),i));const O=yield o.default(p,{method:t,url:p,data:s||{},headers:_});return d(Object.assign(Object.assign({},(null==O?void 0:O.data)||{}),{results:null===(r=null==O?void 0:O.data)||void 0===r?void 0:r.results,error:(null===(u=null==O?void 0:O.data)||void 0===u?void 0:u.error)||!1,message:(null===(c=null==O?void 0:O.data)||void 0===c?void 0:c.message)||"Successful",statusCode:O.status}))}catch(e){return console.log("SERVER SECRET CALL ERROR:",e),d(Object.assign(Object.assign({},(null===(v=null==e?void 0:e.response)||void 0===v?void 0:v.data)||{}),{results:(null===(p=null===(E=null==e?void 0:e.response)||void 0===E?void 0:E.data)||void 0===p?void 0:p.results)||!1,error:(null===(O=null===(_=null==e?void 0:e.response)||void 0===_?void 0:_.data)||void 0===O?void 0:O.error)||!0,message:(null===(A=null===(R=null==e?void 0:e.response)||void 0===R?void 0:R.data)||void 0===A?void 0:A.message)||(null===(y=null==e?void 0:e.response)||void 0===y?void 0:y.data)||"There was an error on our end! Please try again in a few minutes!",statusCode:e.response.status}))}})))),n=e=>{let t=e;return"/"===t[0]&&(t=t.replace("/","")),t};class l extends e.Component{static async getInitialProps({res:e,req:t}){e.setHeader("Content-Type","text/plain");try{const{results:o}=await s("/robots/","put",{headers:(null==t?void 0:t.headers)||{}});e.write(o)}catch(e){console.error(e.error)}e.end()}}module.exports=l;

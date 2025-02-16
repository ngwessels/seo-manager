"use strict";var e=require("react"),t=require("axios");function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=r(e),o=r(t);function n(e,t,r,s){return new(r||(r=Promise))((function(o,n){function l(e){try{d(s.next(e))}catch(e){n(e)}}function i(e){try{d(s.throw(e))}catch(e){n(e)}}function d(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(l,i)}d((s=s.apply(e,t||[])).next())}))}"function"==typeof SuppressedError&&SuppressedError;const l=(e,t="put",r,s,l)=>new Promise(((d,a)=>n(void 0,void 0,void 0,(function*(){var n,u,c,v,E,p,_,O,R,f,y;try{const v=(()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e})();if(!(null==v?void 0:v.projectId))return a({results:!1,error:"Project Id is required"});if(!(null==v?void 0:v.secretKey))return a({results:!1,error:"Project Secret Key is required"});const E=i(e),p=s||("Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`https://v1.seomanager.dev/${E}`:"Test"===process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`http://localhost:3002/${E}`:`https://v1-testing.seomanager.dev/${E}`);let _={X_ProjectId:null==v?void 0:v.projectId,X_ProjectKey:(null==v?void 0:v.projectKey)||"",X_ProjectSecretKey:(null==v?void 0:v.secretKey)||""};l&&(_=Object.assign(Object.assign({},_),l));const O=yield o.default(p,{method:t,url:p,data:r||{},headers:_});return d(Object.assign(Object.assign({},(null==O?void 0:O.data)||{}),{results:null===(n=null==O?void 0:O.data)||void 0===n?void 0:n.results,error:(null===(u=null==O?void 0:O.data)||void 0===u?void 0:u.error)||!1,message:(null===(c=null==O?void 0:O.data)||void 0===c?void 0:c.message)||"Successful",statusCode:O.status}))}catch(e){return console.log("SERVER SECRET CALL ERROR:",e),d(Object.assign(Object.assign({},(null===(v=null==e?void 0:e.response)||void 0===v?void 0:v.data)||{}),{results:(null===(p=null===(E=null==e?void 0:e.response)||void 0===E?void 0:E.data)||void 0===p?void 0:p.results)||!1,error:(null===(O=null===(_=null==e?void 0:e.response)||void 0===_?void 0:_.data)||void 0===O?void 0:O.error)||!0,message:(null===(f=null===(R=null==e?void 0:e.response)||void 0===R?void 0:R.data)||void 0===f?void 0:f.message)||(null===(y=null==e?void 0:e.response)||void 0===y?void 0:y.data)||"There was an error on our end! Please try again in a few minutes!",statusCode:e.response.status}))}})))),i=e=>{let t=e;return"/"===t[0]&&(t=t.replace("/","")),t};class d extends s.default.Component{static async getInitialProps({res:e,req:t}){e.setHeader("Content-Type","text/xml");try{const{results:r}=await l("/sitemap/","put",{path:t.url,headers:t?.headers||{}});e.write(r)}catch(e){console.error(e.error)}e.end()}}module.exports=d;

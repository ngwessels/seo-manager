import{Component as e}from"react";import t from"axios";function s(e,t,s,o){return new(s||(s=Promise))((function(r,n){function a(e){try{i(o.next(e))}catch(e){n(e)}}function c(e){try{i(o.throw(e))}catch(e){n(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,c)}i((o=o.apply(e,t||[])).next())}))}const o=(e,o="put",n,a,c)=>new Promise(((i,E)=>s(void 0,void 0,void 0,(function*(){var s,l,d;try{const l=(()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e})();if(!(null==l?void 0:l.projectId))return E({results:!1,error:"Project Id is required"});const d=r(e),u=a||("Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`https://v1.seomanager.dev/${d}`:"Test"===process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?`http://localhost:3002/${d}`:`https://v1-testing.seomanager.dev/${d}`);let v={X_ProjectId:null==l?void 0:l.projectId,X_ProjectKey:(null==l?void 0:l.projectKey)||""};c&&(v=Object.assign(Object.assign({},v),c));const p=yield t(u,{method:o,data:n||{},headers:v});return i(Object.assign(Object.assign({},(null==p?void 0:p.data)||{}),{results:null===(s=null==p?void 0:p.data)||void 0===s?void 0:s.results,statusCode:p.status}))}catch(e){return console.log("SERVER CALL ERROR:",e),i(Object.assign(Object.assign({},(null===(l=null==e?void 0:e.response)||void 0===l?void 0:l.data)||{}),{results:!1,data:null===(d=null==e?void 0:e.response)||void 0===d?void 0:d.data,statusCode:e.response.status}))}})))),r=e=>{let t=e;return"/"===t[0]&&(t=t.replace("/","")),t};class n extends e{static async getInitialProps({res:e,req:t}){e.setHeader("Content-Type","text/plain");try{const{results:s}=await o("/robots/","put",{headers:t?.headers||{}});e.write(s)}catch(e){console.error(e.error)}e.end()}}export{n as default};
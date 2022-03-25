import e from"../node_modules/node-cache/index.js";const t=new e,o=(e,o)=>{const n={projectKey:o,projectId:e};t.set("init",n,1e4)},n=()=>{const e=t.get("init");return e||!1};export{o as SEOinitialize,n as returnKey};
//# sourceMappingURL=Init.js.map

"use strict";module.exports=e=>{let t={projectId:""};const{projectId:r,projectKey:c,secretKey:o}=e;if(r&&(t.projectId=r,process.env.SEO_MANAGER_MODULE_PROJECTID=r),c&&(t.projectKey=c,process.env.SEO_MANAGER_MODULE_PROJECTKEY=c),o&&(t.secretKey=o,process.env.SEO_MANAGER_MODULE_SECRETKEY=o),!(null==t?void 0:t.projectId))throw"Please add a projectId by calling the SEOInit function SEOInit({projectId: '<<Add Value Here>>'})";return!0};
//# sourceMappingURL=init.cjs.map

import e from"react";import{connect as o}from"react-redux";const s=()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e},t=e=>{process.env.SEO_MANAGER_MODULE_PROJECTPLAN=JSON.stringify(e)},i=e.lazy((()=>import("./login-3bc156e6.js"))),n=e.lazy((()=>import("./loading-24bd0aab.js"))),l=e.lazy((()=>import("./Manager-e47d9aa6.js"))),r=e.lazy((()=>import("./notAuthorized-cca0f732.js")));class d extends e.Component{constructor(e){super(e),this.onClose=()=>{this.props.onClose()},this.setLoading=e=>{this.setState({loading:e})};const o=s();this.state={loading:!1,projectId:o.projectId}}render(){var o,s,t,d,a,p,v,E,u,c,g,h,_,C,O,m;return console.log(null===(o=this.props)||void 0===o?void 0:o.user),e.createElement(e.Fragment,null,e.createElement(e.Suspense,{fallback:e.createElement(e.Fragment,null)},!1===(null===(t=null===(s=this.props)||void 0===s?void 0:s.user)||void 0===t?void 0:t.isLoggedIn)&&e.createElement(i,{onClose:this.onClose}),(null===(null===(a=null===(d=this.props)||void 0===d?void 0:d.user)||void 0===a?void 0:a.isLoggedIn)||!0===(null===(p=this.state)||void 0===p?void 0:p.loading))&&e.createElement(n,{onClose:this.onClose}),!0===(null===(E=null===(v=this.props)||void 0===v?void 0:v.user)||void 0===E?void 0:E.isLoggedIn)&&!0===(null===(c=null===(u=this.props)||void 0===u?void 0:u.user)||void 0===c?void 0:c.authorizedProject)&&e.createElement(l,{data:null===(g=this.props)||void 0===g?void 0:g.data,isNewPage:null===(h=this.props)||void 0===h?void 0:h.isNewPage,onClose:this.onClose,onIsLoading:this.setLoading,isLoading:this.state.loading,onChangeComplete:this.props.onChangeComplete}),!0===(null===(C=null===(_=this.props)||void 0===_?void 0:_.user)||void 0===C?void 0:C.isLoggedIn)&&!(null===(m=null===(O=this.props)||void 0===O?void 0:O.user)||void 0===m?void 0:m.authorizedProject)&&e.createElement(r,{onClose:this.onClose})))}}var a=o((e=>({user:null==e?void 0:e.user})))(d),p=Object.freeze({__proto__:null,default:a});export{p as i,s as r,t as s};

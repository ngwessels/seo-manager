import e from"react";import{connect as o}from"react-redux";const s=()=>{let e={};return process.env.SEO_MANAGER_MODULE_SECRETKEY&&(e.secretKey=process.env.SEO_MANAGER_MODULE_SECRETKEY),process.env.SEO_MANAGER_MODULE_PROJECTKEY&&(e.projectKey=process.env.SEO_MANAGER_MODULE_PROJECTKEY),process.env.SEO_MANAGER_MODULE_PROJECTID&&(e.projectId=process.env.SEO_MANAGER_MODULE_PROJECTID),e},t=e=>{process.env.SEO_MANAGER_MODULE_PROJECTPLAN=JSON.stringify(e)},i=e.lazy((()=>import("./login-323a3e84.js"))),n=e.lazy((()=>import("./loading-94dbb4dd.js"))),l=e.lazy((()=>import("./Manager-f7e53238.js"))),r=e.lazy((()=>import("./notAuthorized-25bf414d.js")));class d extends e.Component{constructor(e){super(e),this.onClose=()=>{this.props.onClose()},this.setLoading=e=>{this.setState({loading:e})};const o=s();this.state={loading:!1,projectId:o.projectId}}render(){var o,s,t,d,a,p,E,v,u,c,g,h,_,C,O;return e.createElement(e.Fragment,null,e.createElement(e.Suspense,{fallback:e.createElement(e.Fragment,null)},!1===(null===(s=null===(o=this.props)||void 0===o?void 0:o.user)||void 0===s?void 0:s.isLoggedIn)&&e.createElement(i,{onClose:this.onClose}),(null===(null===(d=null===(t=this.props)||void 0===t?void 0:t.user)||void 0===d?void 0:d.isLoggedIn)||!0===(null===(a=this.state)||void 0===a?void 0:a.loading))&&e.createElement(n,{onClose:this.onClose}),!0===(null===(E=null===(p=this.props)||void 0===p?void 0:p.user)||void 0===E?void 0:E.isLoggedIn)&&!0===(null===(u=null===(v=this.props)||void 0===v?void 0:v.user)||void 0===u?void 0:u.authorizedProject)&&e.createElement(l,{data:null===(c=this.props)||void 0===c?void 0:c.data,isNewPage:null===(g=this.props)||void 0===g?void 0:g.isNewPage,onClose:this.onClose,onIsLoading:this.setLoading,isLoading:this.state.loading,onChangeComplete:this.props.onChangeComplete}),!0===(null===(_=null===(h=this.props)||void 0===h?void 0:h.user)||void 0===_?void 0:_.isLoggedIn)&&!(null===(O=null===(C=this.props)||void 0===C?void 0:C.user)||void 0===O?void 0:O.authorizedProject)&&e.createElement(r,{onClose:this.onClose})))}}var a=o((e=>({user:null==e?void 0:e.user})))(d),p=Object.freeze({__proto__:null,default:a});export{p as i,s as r,t as s};

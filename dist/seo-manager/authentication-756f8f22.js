import{_ as o}from"./index-b06cf1d6.js";import t from"react";import{connect as r}from"react-redux";import{f as e}from"./firebase-f83deced.js";import{getAuth as s,onAuthStateChanged as i}from"firebase/auth";import"redux";import"firebase/app";const a=s(e);class l extends t.Component{constructor(t){super(t),o(this,"componentDidMount",(()=>{i(a,(async o=>{this.loadUser(o)})),null!=a&&a.currentUser&&this.loadUser(a.currentUser)})),o(this,"loadUser",(async o=>{const t=["owner","admin","editor"];if(o){var r,e,s,i,a,l,n,d;const u=await o.getIdTokenResult(!0);null!=u&&null!==(r=u.claims)&&void 0!==r&&r[null===(e=this.props)||void 0===e||null===(s=e.seoData)||void 0===s||null===(i=s.initial)||void 0===i?void 0:i.projectId]&&t.includes(null==u||null===(a=u.claims)||void 0===a?void 0:a[null===(l=this.props)||void 0===l||null===(n=l.seoData)||void 0===n||null===(d=n.initial)||void 0===d?void 0:d.projectId])?o.authorizedProject=!0:o.authorizedProject=!1}const u={type:"SET_USER",results:o};this.props.dispatch(u)})),this.state={}}render(){return null}}var n=r((o=>({user:o.user,seoData:null==o?void 0:o.seoData})))(l);export{n as default};

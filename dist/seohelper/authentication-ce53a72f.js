import{a as t}from"./default-56c28209.js";import e from"react";import{connect as o}from"react-redux";import{f as s}from"./firebase-f83deced.js";import{getAuth as r,onAuthStateChanged as a}from"firebase/auth";import"firebase/app";const i=r(s);class n extends e.Component{constructor(e){super(e),t(this,"componentDidMount",(()=>{const t=["owner","admin","editor"];a(i,(async e=>{if(e){const o=await e.getIdTokenResult(!0);o?.claims?.[this.props?.seoData?.initial?.projectId]&&t.includes(o?.claims?.[this.props?.seoData?.initial?.projectId])?e.authorizedProject=!0:e.authorizedProject=!1}const o={type:"SET_USER",results:e};this.props.dispatch(o)})),console.log("Authentication Mounted")})),this.state={}}render(){return null}}var c=o((t=>({user:t.user,seoData:t?.seoData})))(n);export{c as default};

import{a as t}from"./default-65a62722.js";import e from"react";import{connect as r}from"react-redux";import{f as s}from"./firebase-f83deced.js";import{getAuth as o,onAuthStateChanged as a}from"firebase/auth";import"firebase/app";const i=o(s);class p extends e.Component{constructor(e){super(e),t(this,"componentDidMount",(()=>{const t=["owner","admin","editor"];a(i,(async e=>{if(e){const r=await e.getIdTokenResult(!0);r?.claims?.[this.props?.seoData?.initial?.projectId]&&t.includes(r?.claims?.[this.props?.seoData?.initial?.projectId])?e.authorizedProject=!0:e.authorizedProject=!1}const r={type:"SET_USER",results:e};this.props.dispatch(r)}))})),this.state={}}render(){return null}}var n=r((t=>({user:t.user,seoData:t?.seoData})))(p);export{n as default};

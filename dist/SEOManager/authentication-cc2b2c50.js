import{_ as t}from"./index-bac5f3de.js";import e from"react";import{connect as r}from"react-redux";import{f as o}from"./firebase-f83deced.js";import{getAuth as s,onAuthStateChanged as a}from"firebase/auth";import"redux";import"firebase/app";const i=s(o);class p extends e.Component{constructor(e){super(e),t(this,"componentDidMount",(()=>{const t=["owner","admin","editor"];a(i,(async e=>{if(e){const r=await e.getIdTokenResult(!0);r?.claims?.[this.props?.seoData?.initial?.projectId]&&t.includes(r?.claims?.[this.props?.seoData?.initial?.projectId])?e.authorizedProject=!0:e.authorizedProject=!1}const r={type:"SET_USER",results:e};this.props.dispatch(r)}))})),this.state={}}render(){return null}}var n=r((t=>({user:t.user,seoData:t?.seoData})))(p);export{n as default};
import{_ as e}from"./index-aea4d4ee.js";import t from"react";import{connect as s}from"react-redux";import{f as r}from"./firebase-f83deced.js";import{getAuth as o,onAuthStateChanged as a}from"firebase/auth";import"redux";import"firebase/app";const i=o(r);class n extends t.Component{constructor(t){super(t),e(this,"componentDidMount",(()=>{a(i,(async e=>{this.loadUser(e)})),i?.currentUser&&this.loadUser(i.currentUser)})),e(this,"loadUser",(async e=>{console.log("USER:",e);const t=["owner","admin","editor"];if(e){const s=await e.getIdTokenResult(!0);console.log("CUSTOM CLAIMS:",s,this.props?.seoData?.initial),s?.claims?.[this.props?.seoData?.initial?.projectId]&&t.includes(s?.claims?.[this.props?.seoData?.initial?.projectId])?e.authorizedProject=!0:e.authorizedProject=!1}const s={type:"SET_USER",results:e};this.props.dispatch(s)})),this.state={}}render(){return null}}var c=s((e=>({user:e.user,seoData:e?.seoData})))(n);export{c as default};
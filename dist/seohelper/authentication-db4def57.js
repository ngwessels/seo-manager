import{a as e}from"./default-645324be.js";import s from"react";import{connect as t}from"react-redux";import{f as r}from"./firebase-f83deced.js";import{getAuth as o,onAuthStateChanged as a}from"firebase/auth";import"firebase/app";const i=o(r);class c extends s.Component{constructor(s){super(s),e(this,"componentDidMount",(()=>{a(i,(async e=>{this.loadUser(e)})),i?.currentUser&&this.loadUser(i.currentUser)})),e(this,"loadUser",(async e=>{if(console.log("USER:",e),e){const s=await e.getIdTokenResult(!0);console.log("CUSTOM CLAIMS:",s),s?.claims?.[this.props?.seoData?.initial?.projectId]&&permissionLevels.includes(s?.claims?.[this.props?.seoData?.initial?.projectId])?e.authorizedProject=!0:e.authorizedProject=!1}const s={type:"SET_USER",results:e};this.props.dispatch(s)})),this.state={}}render(){return null}}var n=t((e=>({user:e.user,seoData:e?.seoData})))(c);export{n as default};
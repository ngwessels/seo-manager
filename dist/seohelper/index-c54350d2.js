import e from"react";import{connect as t,Provider as s}from"react-redux";import{configureStore as n}from"@reduxjs/toolkit";import{_ as a}from"./default-a8c480eb.js";import{ThemeProvider as o,createTheme as i}from"@mui/material";var r=n({reducer:{user:(e={isLoggedIn:null},t)=>"SET_USER"===t.type?a(a(a({},e),t.results),{},{isLoggedIn:!!t?.results?.email}):e,seoData:(e={initial:{},manager:{},plan:{}},t)=>{let s=a({},e);switch(t.type){case"SET_INITIAL_SEO_DATA":s.initial=t.results?t.results:{};break;case"SET_MANAGER_SEO_DATA":s.manager=t.results?t.results:{};break;case"UPDATE_MANAGER_SEO_DATA":s.manager[t.location]=t.results;break;case"SET_MANAGER_PROJECT_PLAN":s.plan=t.results}return s},version:(e="v1",t)=>e},serializableCheck:!1});const l=e.lazy((()=>import("./analytics-e6ac2b7b.js"))),p=e.lazy((()=>import("./authentication-dc17c848.js"))),u=e.lazy((()=>import("./index-21dcf559.js").then((function(e){return e.i}))));class c extends e.Component{constructor(e){super(e),this.componentDidMount=()=>{var e;if(null===(e=this.props)||void 0===e?void 0:e.data){const e={type:"SET_INITIAL_SEO_DATA",results:this.props.data};this.props.dispatch(e)}},this.componentDidUpdate=e=>{var t;if(JSON.stringify(null==e?void 0:e.data)!==JSON.stringify(null===(t=this.props)||void 0===t?void 0:t.data)){const e={type:"SET_INITIAL_SEO_DATA",results:this.props.data};this.props.dispatch(e)}},this.clickToOpenManager=()=>{var e;(null===(e=this.props)||void 0===e?void 0:e.onOpen)&&this.props.onOpen(),this.setState({isManagerOpen:!0,authentication:!0})},this.clickToCloseManager=()=>{var e;this.setState({isManagerOpen:!1}),(null===(e=this.props)||void 0===e?void 0:e.onClose)&&this.props.onClose()},this.onChangeComplete=e=>{var t,s;this.setState({isManagerOpen:!1}),(null===(t=this.props)||void 0===t?void 0:t.onChangeComplete)&&this.props.onChangeComplete(e),(null===(s=this.props)||void 0===s?void 0:s.onClose)&&this.props.onClose()},this.state={authentication:!0===(null==e?void 0:e.isManagerOpen),isManagerOpen:!0===(null==e?void 0:e.isManagerOpen)},!0===(null==e?void 0:e.isManagerOpen)&&(null==e?void 0:e.onOpen)&&(null==e||e.onOpen())}render(){var t,s,n;return e.createElement(e.Fragment,null,e.createElement("button",{type:"button",id:"open-seo-manager",style:{display:"none"},onClick:this.clickToOpenManager}),e.createElement(e.Suspense,{fallback:e.createElement(e.Fragment,null)},e.createElement(l,null),(null===(t=this.state)||void 0===t?void 0:t.authentication)&&e.createElement(p,null),!0===this.state.isManagerOpen&&e.createElement(u,{data:null===(s=this.props)||void 0===s?void 0:s.data,isNewPage:null===(n=this.props)||void 0===n?void 0:n.isNewPage,onClose:this.clickToCloseManager,onChangeComplete:this.onChangeComplete})))}}var d=t((e=>({user:null==e?void 0:e.user})))(c);const h=i({});class m extends e.Component{constructor(e){super(e)}render(){return e.createElement(s,{store:r},e.createElement(o,{theme:h},e.createElement(d,Object.assign({},this.props))))}}export{m as default};

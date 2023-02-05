import e from"react";import{connect as t,Provider as s}from"react-redux";import{combineReducers as n,createStore as a}from"redux";import{_ as o}from"./default-f9890755.js";var i=a(n({user:(e={isLoggedIn:null},t)=>{let s=o({},e);if("SET_USER"===t.type)s=t.results?t.results:{},s.isLoggedIn=!!t?.results?.email;return s},seoData:(e={initial:{},manager:{},plan:{}},t)=>{let s=o({},e);switch(t.type){case"SET_INITIAL_SEO_DATA":s.initial=t.results?t.results:{};break;case"SET_MANAGER_SEO_DATA":s.manager=t.results?t.results:{};break;case"UPDATE_MANAGER_SEO_DATA":s.manager[t.location]=t.results;break;case"SET_MANAGER_PROJECT_PLAN":s.plan=t.results}return s}}));const r=e.lazy((()=>import("./analytics-cc51fd94.js"))),l=e.lazy((()=>import("./authentication-83d7ce5b.js"))),p=e.lazy((()=>import("./index-d77f326e.js").then((function(e){return e.i}))));class u extends e.Component{constructor(e){super(e),this.componentDidMount=()=>{console.log("DATA:",this.props.data),setTimeout((()=>{var e;if(null===(e=this.props)||void 0===e?void 0:e.data){const e={type:"SET_INITIAL_SEO_DATA",results:this.props.data};this.props.dispatch(e)}}),100)},this.componentDidUpdate=e=>{var t;if(JSON.stringify(null==e?void 0:e.data)!==JSON.stringify(null===(t=this.props)||void 0===t?void 0:t.data)){console.log("DATA:",this.props.data);const e={type:"SET_INITIAL_SEO_DATA",results:this.props.data};this.props.dispatch(e)}},this.clickToOpenManager=()=>{var e;this.setState({isManagerOpen:!0,authentication:!0}),(null===(e=this.props)||void 0===e?void 0:e.onOpen)&&this.props.onOpen()},this.clickToCloseManager=()=>{var e;this.setState({isManagerOpen:!1}),(null===(e=this.props)||void 0===e?void 0:e.onClose)&&this.props.onClose()},this.onChangeComplete=e=>{var t,s;this.setState({isManagerOpen:!1}),(null===(t=this.props)||void 0===t?void 0:t.onChangeComplete)&&this.props.onChangeComplete(e),(null===(s=this.props)||void 0===s?void 0:s.onClose)&&this.props.onClose()},this.state={authentication:!0===(null==e?void 0:e.isManagerOpen),isManagerOpen:!0===(null==e?void 0:e.isManagerOpen)},!0===(null==e?void 0:e.isManagerOpen)&&(null==e?void 0:e.onOpen)&&(null==e||e.onOpen())}render(){var t,s,n;return e.createElement(e.Fragment,null,e.createElement("button",{type:"button",id:"open-seo-manager",style:{display:"none"},onClick:this.clickToOpenManager}),e.createElement(e.Suspense,{fallback:e.createElement(e.Fragment,null)},e.createElement(r,null),(null===(t=this.state)||void 0===t?void 0:t.authentication)&&e.createElement(l,null),!0===this.state.isManagerOpen&&e.createElement(p,{data:null===(s=this.props)||void 0===s?void 0:s.data,isNewPage:null===(n=this.props)||void 0===n?void 0:n.isNewPage,onClose:this.clickToCloseManager,onChangeComplete:this.onChangeComplete})))}}var d=t((e=>({user:null==e?void 0:e.user})))(u);class c extends e.Component{constructor(e){super(e)}render(){return e.createElement(s,{store:i},e.createElement(d,Object.assign({},this.props)))}}export{c as default};

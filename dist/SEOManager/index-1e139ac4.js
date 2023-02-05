import e from"react";import{connect as t,Provider as n}from"react-redux";import{combineReducers as r,createStore as o}from"redux";function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const l=o(r({user:(e={isLoggedIn:null},t)=>{let n=s({},e);if("SET_USER"===t.type)n=t.results?t.results:{},n.isLoggedIn=!!t?.results?.email;return n},seoData:(e={initial:{},manager:{},plan:{}},t)=>{let n=s({},e);switch(t.type){case"SET_INITIAL_SEO_DATA":n.initial=t.results?t.results:{};break;case"SET_MANAGER_SEO_DATA":n.manager=t.results?t.results:{};break;case"UPDATE_MANAGER_SEO_DATA":n.manager[t.location]=t.results;break;case"SET_MANAGER_PROJECT_PLAN":n.plan=t.results}return n}})),p=e.lazy((()=>import("./analytics-e012d6f6.js"))),u=e.lazy((()=>import("./authentication-05a032d7.js"))),c=e.lazy((()=>import("./index-d77f326e.js").then((function(e){return e.i}))));class d extends e.Component{constructor(e){super(e),this.componentDidMount=()=>{setTimeout((()=>{var e;if(null===(e=this.props)||void 0===e?void 0:e.data){const e={type:"SET_INITIAL_SEO_DATA",results:this.props.data};this.props.dispatch(e)}}),100)},this.componentDidUpdate=e=>{var t;if(JSON.stringify(null==e?void 0:e.data)!==JSON.stringify(null===(t=this.props)||void 0===t?void 0:t.data)){console.log("DATA:",this.props.data);const e={type:"SET_INITIAL_SEO_DATA",results:this.props.data};this.props.dispatch(e)}},this.clickToOpenManager=()=>{var e;this.setState({isManagerOpen:!0,authentication:!0}),(null===(e=this.props)||void 0===e?void 0:e.onOpen)&&this.props.onOpen()},this.clickToCloseManager=()=>{var e;this.setState({isManagerOpen:!1}),(null===(e=this.props)||void 0===e?void 0:e.onClose)&&this.props.onClose()},this.onChangeComplete=e=>{var t,n;this.setState({isManagerOpen:!1}),(null===(t=this.props)||void 0===t?void 0:t.onChangeComplete)&&this.props.onChangeComplete(e),(null===(n=this.props)||void 0===n?void 0:n.onClose)&&this.props.onClose()},this.state={authentication:!0===(null==e?void 0:e.isManagerOpen),isManagerOpen:!0===(null==e?void 0:e.isManagerOpen)},!0===(null==e?void 0:e.isManagerOpen)&&(null==e?void 0:e.onOpen)&&(null==e||e.onOpen())}render(){var t,n,r;return e.createElement(e.Fragment,null,e.createElement("button",{type:"button",id:"open-seo-manager",style:{display:"none"},onClick:this.clickToOpenManager}),e.createElement(e.Suspense,{fallback:e.createElement(e.Fragment,null)},e.createElement(p,null),(null===(t=this.state)||void 0===t?void 0:t.authentication)&&e.createElement(u,null),!0===this.state.isManagerOpen&&e.createElement(c,{data:null===(n=this.props)||void 0===n?void 0:n.data,isNewPage:null===(r=this.props)||void 0===r?void 0:r.isNewPage,onClose:this.clickToCloseManager,onChangeComplete:this.onChangeComplete})))}}var h=t((e=>({user:null==e?void 0:e.user})))(d);class m extends e.Component{constructor(e){super(e)}render(){return e.createElement(n,{store:l},e.createElement(h,Object.assign({},this.props)))}}export{a as _,m as i};

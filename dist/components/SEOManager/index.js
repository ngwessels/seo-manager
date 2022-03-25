import{__awaiter as t}from"../../node_modules/tslib/tslib.es6.js";import e from"react";import a from"react-helmet";import{firebase as n}from"../../firebase.js";import{getAnalytics as i}from"firebase/analytics";import{getAuth as s,onAuthStateChanged as o}from"firebase/auth";const r=s(n);class c extends e.Component{constructor(t){super(t),this.state={data:t.data}}componentDidMount(){console.log("SEO Manager Finished Rendering at:",Date.now()),o(r,(e=>t(this,void 0,void 0,(function*(){console.log("NPM Calling Analytics:"),i(n),console.log("NPM USER:",e)}))))}render(){return e.createElement(a,null,e.createElement("title",null,this.props.data.title||""),e.createElement("meta",{name:"description",content:this.props.data.description||"",key:"description"}),this.state.data.keywords&&e.createElement("meta",{name:"keywords",content:this.state.data.keywords}),this.state.data.canonicalURL&&e.createElement("link",{href:`${this.state.data.canonicalURL}${this.state.data.path}`,rel:"canonical"}),e.createElement("meta",{property:"og:locale",content:"en_US"}),e.createElement("meta",{property:"og:type",content:"website"}),this.state.data.title&&e.createElement("meta",{property:"og:title",content:this.state.data.title}),this.state.data.description&&e.createElement("meta",{property:"og:description",content:this.state.data.description}),this.state.data.image&&e.createElement("meta",{property:"og:image",content:this.state.data.image}),this.state.data.canonicalURL&&e.createElement("meta",{property:"og:url",content:`${this.state.data.canonicalURL}${this.state.data.path}`}),this.state.data.title&&e.createElement("meta",{name:"twitter:title",content:this.state.data.title}),this.state.data.description&&e.createElement("meta",{name:"twitter:description",content:this.state.data.description}),this.state.data.image&&e.createElement("meta",{name:"twitter:image",content:this.state.data.image}),e.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),e.createElement("meta",{name:"robots",content:`${this.state.data.index||"index"}, ${this.state.data.follow||"follow"}`}),this.props.children)}}export default c;
//# sourceMappingURL=index.js.map

import{__awaiter as e}from"../../node_modules/tslib/tslib.es6.js";import t from"react";import{returnKey as a}from"../../utils/Init.js";import"./styles.css.js";import i from"../../node_modules/@mui/icons-material/Close.js";import{firebase as o}from"../../firebase.js";import{getAnalytics as n}from"../../node_modules/@firebase/analytics/dist/esm/index.esm2017.js";import{n as s,t as r,a5 as l,x as m}from"../../node_modules/@firebase/auth/dist/esm2017/index-6de4cbb9.js";import"../../node_modules/@firebase/app/dist/esm/index.esm2017.js";import"../../node_modules/@firebase/logger/dist/esm/index.esm2017.js";import d from"./Manager.js";import c from"../../node_modules/@mui/material/styles/styled.js";import p from"../../node_modules/@mui/material/Dialog/Dialog.js";import u from"../../node_modules/@mui/material/DialogTitle/DialogTitle.js";import h from"../../node_modules/@mui/material/IconButton/IconButton.js";import g from"../../node_modules/@mui/material/DialogContent/DialogContent.js";import E from"../../node_modules/@mui/material/Typography/Typography.js";import f from"../../node_modules/@mui/material/Grid/Grid.js";import y from"../../node_modules/@mui/material/TextField/TextField.js";import b from"../../node_modules/@mui/material/Button/Button.js";const v=c(p)((({theme:e})=>({"& .MuiDialogContent-root":{padding:e.spacing(2)},"& .MuiDialogActions-root":{padding:e.spacing(1)},"& .MuiPaper-root":{margin:"0px",width:"90vw",maxWidth:"900px"}}))),S=s(o);class j extends t.Component{constructor(i){super(i),this.componentDidMount=()=>{console.log("SEOHelper Mounted:",Date.now()),this.setState({loading:!0,user:!1,loaded:!0}),r(S,(t=>e(this,void 0,void 0,(function*(){var e;if(t){const a=yield t.getIdTokenResult(!0),i=Object.assign(Object.assign({},t),{customClaims:a.claims});"admin"===(null===(e=null==a?void 0:a.claims)||void 0===e?void 0:e[this.state.projectId])?this.setState({authorizedUser:!0}):this.setState({authorizedUser:!1}),this.setState({user:i})}else this.setState({user:!1});this.setState({loading:!1}),n(o)}))))},this.checkComponentErrors=e=>{if(!e.data&&!1!==e.data)throw"Please add this tag to your SEOHelper component 'data={this.props.seo}'. If you are using NextJS make sure you are calling our fetchSEO function in getServerSideProps or getStaticProps and passing the data as a prop.";if(!e.head)throw"Please add this tag to your SEOHelper component 'head={(data) => (<Head>{data}</Head>)}'. If your not using NextJS replace <Head>{data}</Head> with <Helmet>{data}</Helmet> from npm react-helmet."},this.formatHead=e=>e&&!1!==e.valid?t.createElement(t.Fragment,null,t.createElement("title",null,e.title||(null==e?void 0:e.defaultTitle)||""),t.createElement("meta",{name:"description",content:e.description||e.defaultDescription||"",key:"description"}),e.keywords&&t.createElement("meta",{name:"keywords",content:e.keywords}),e.canonicalURL&&t.createElement("link",{href:`${e.canonicalURL}${e.path}`,rel:"canonical"}),t.createElement("meta",{property:"og:locale",content:"en_US"}),t.createElement("meta",{property:"og:type",content:"website"}),e.title&&t.createElement("meta",{property:"og:title",content:e.title||(null===response||void 0===response?void 0:response.error)}),e.description&&t.createElement("meta",{property:"og:description",content:e.description||e.defaultDescription}),e.image.url&&t.createElement("meta",{property:"og:image",content:e.image.url}),e.canonicalURL&&t.createElement("meta",{property:"og:url",content:`${e.canonicalURL}${e.path}`}),e.title&&t.createElement("meta",{name:"twitter:title",content:e.title||(null===response||void 0===response?void 0:response.error)}),e.description&&t.createElement("meta",{name:"twitter:description",content:e.description||e.defaultDescription}),e.image.url&&t.createElement("meta",{name:"twitter:image",content:e.image.url}),(e.pageFavicon||e.projectFavicon)&&t.createElement("link",{rel:"icon",type:"image/x-icon",href:e.pageFavicon||e.projectFavicon,sizes:"192x192"}),t.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),t.createElement("meta",{name:"robots",content:`${e.index||"index"}, ${e.follow||"follow"}`}),e.ldJson&&t.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:e.ldJson}}),this.props.children):null,this.signIn=t=>e(this,void 0,void 0,(function*(){t.preventDefault(),this.setState({loading:!0}),l(S,this.state.email,this.state.password).then((e=>{this.setState({loading:!1})})).catch((e=>{e.message,this.setState({loginError:e.code,loading:!1})}))})),this.signOut=()=>e(this,void 0,void 0,(function*(){yield m(S)})),this.resetData=()=>{this.setState({data:this.state.dataOriginal,openManager:!1})},this.updateData=(e,t)=>{this.setState({data:e}),!0===t&&this.setState({dataOriginal:e})},this.openManager=e=>{this.setState({openManager:!0})},this.handleClose=()=>{},this.checkComponentErrors(i);const s=a();this.state={data:i.data,dataOriginal:i.data,head:i.head(this.formatHead(i.data)),loading:!1,loaded:!1,open:!0,user:null,email:"",password:"",loginError:"",projectId:s.projectId,authorizedUser:!1,openManager:!1}}render(){return t.createElement(t.Fragment,null,!1===this.state.loading&&null===this.state.user?t.createElement(t.Fragment,null,this.state.head):t.createElement(t.Fragment,null,this.props.head(this.formatHead(this.state.data))),t.createElement("button",{type:"button",className:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop",id:"open-seo-manager",style:{display:"none"},onClick:this.openManager}),t.createElement(v,{onClose:this.resetData,"aria-labelledby":"customized-dialog-title",open:this.state.openManager,maxWidth:!1},t.createElement(u,{sx:{m:0,p:2}},"SEO Manager",t.createElement(h,{"aria-label":"close",onClick:this.resetData,sx:{position:"absolute",right:8,top:8,color:e=>e.palette.grey[500]}},t.createElement(i,null))),!1===this.state.loading&&this.state.user&&!0===this.state.authorizedUser&&!0===this.state.openManager&&t.createElement(d,{onChange:this.updateData,data:this.state.data,dataOriginal:this.state.dataOriginal,resetData:this.resetData,onChangeComplete:this.props.onChangeComplete,user:this.state.user}),!1===this.state.user&&!1===this.state.loading&&t.createElement(g,null,t.createElement("form",{onSubmit:this.signIn},t.createElement(E,null,"Please login to your SEO Manager Account to continue"),t.createElement(f,{item:!0,mb:1},t.createElement(y,{id:"email",label:"Email address",variant:"standard",placeholder:"name@example.com",onChange:e=>{this.setState({email:e.target.value})},required:!0,style:{width:"100%"}})),t.createElement(f,{item:!0,mb:1},t.createElement(y,{id:"password",label:"Password",variant:"standard",onChange:e=>{this.setState({password:e.target.value})},required:!0,type:"password",style:{width:"100%"}})),this.state.loginError&&t.createElement("div",{className:"alert alert-danger d-flex align-items-center",role:"alert",style:{marginTop:15}},t.createElement("svg",{className:"bi flex-shrink-0 me-2",width:"24",height:"24",role:"img","aria-label":"Danger:"},t.createElement("use",{xlinkHref:"#exclamation-triangle-fill"})),t.createElement("div",null,this.state.loginError)),t.createElement("div",{className:"d-grid gap-2"},t.createElement(b,{variant:"contained",type:"submit",style:{marginTop:15},fullWidth:!0},"Login")))),!1===this.state.loading&&this.state.user&&!1===this.state.authorizedUser&&t.createElement(t.Fragment,null,t.createElement(g,null,t.createElement("p",null,"Unfortunately it appears you are not authorized to make changes to this website! Is it possible your signed in on the wrong account?"," ",t.createElement("a",{onClick:this.signOut,style:{cursor:"pointer"}},t.createElement("strong",null,"Click Here to Sign Out")))))))}}export default j;
//# sourceMappingURL=index.js.map
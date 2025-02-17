import{_ as e}from"./_tslib-f5f52db8.js";import t from"react";import{connect as a}from"react-redux";import{DialogTitle as r,IconButton as i,DialogContent as s,Typography as l,Grid as o,TextField as n}from"@mui/material";import m from"@mui/icons-material/Close";import d from"@mui/lab/LoadingButton";import{B as c}from"./BootstrapDialog-12d92754.js";import{f as g}from"./firebase-f83deced.js";import{getAuth as p,signInWithEmailAndPassword as u,signOut as h}from"firebase/auth";import"@mui/material/styles";import"firebase/app";const f=p(g);class E extends t.Component{constructor(t){super(t),this.signIn=t=>e(this,void 0,void 0,(function*(){t.preventDefault(),this.setState({loading:!0}),u(f,this.state.email,this.state.password).then((()=>{this.setState({loading:!1})})).catch((e=>{this.setState({loginError:e.code,loading:!1})}))})),this.signOut=()=>e(this,void 0,void 0,(function*(){yield h(f)})),this.state={loading:!1,loginError:"",email:"",password:""}}render(){return t.createElement(t.Fragment,null,t.createElement(c,{onClose:this.props.onClose,"aria-labelledby":"SEO Manager Login",open:!0,maxWidth:!1,style:{zIndex:100}},t.createElement(r,{sx:{m:0,p:2},className:"nextjs-seo-manager__title"},"Login",t.createElement(i,{"aria-label":"close",onClick:this.props.onClose,sx:{position:"absolute",right:8,top:8,color:e=>e.palette.grey[500]}},t.createElement(m,null))),t.createElement(s,null,t.createElement("form",{onSubmit:this.signIn},t.createElement(l,{className:"nextjs-seo-manager__p"},"Please login to your SEO Manager Account to continue"),t.createElement(o,{item:!0,mb:1},t.createElement(n,{id:"email",label:"Email address",variant:"standard",placeholder:"name@example.com",onChange:e=>{this.setState({email:e.target.value})},required:!0,style:{width:"100%"}})),t.createElement(o,{item:!0,mb:1},t.createElement(n,{id:"password",label:"Password",variant:"standard",onChange:e=>{this.setState({password:e.target.value})},required:!0,type:"password",style:{width:"100%"}})),this.state.loginError&&t.createElement("div",{className:"alert alert-danger d-flex align-items-center",role:"alert",style:{marginTop:15}},t.createElement("svg",{className:"bi flex-shrink-0 me-2",width:"24",height:"24",role:"img","aria-label":"Danger:"},t.createElement("use",{xlinkHref:"#exclamation-triangle-fill"})),t.createElement("div",null,this.state.loginError)),t.createElement("div",{className:"d-grid gap-2"},t.createElement(d,{loading:this.state.loading,variant:"contained",type:"submit",style:{marginTop:15},fullWidth:!0,className:"nextjs-seo-manager__button"},"Login"))))))}}var b=a((e=>({user:null==e?void 0:e.user})))(E);export{b as default};

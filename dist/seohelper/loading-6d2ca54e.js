import e from"react";import{DialogTitle as t,IconButton as a,DialogContent as l,CircularProgress as o}from"@mui/material";import n from"@mui/icons-material/Close";import{B as r}from"./BootstrapDialog-68cff419.js";import"@mui/material/styles";class s extends e.Component{constructor(e){super(e),this.state={hidden:!0}}componentDidMount(){setTimeout((()=>{this.setState({hidden:!1})}),500)}render(){return!0===this.state.hidden?null:e.createElement(e.Fragment,null,e.createElement(r,{onClose:this.props.onClose,"aria-labelledby":"SEO Manager Loading",open:!0,maxWidth:!1,style:{zIndex:100}},e.createElement(t,{sx:{m:0,p:2},className:"nextjs-seo-manager__title"},"Loading ...",e.createElement(a,{"aria-label":"close",onClick:this.props.onClose,sx:{position:"absolute",right:8,top:8,color:e=>e.palette.grey[500]}},e.createElement(n,null))),e.createElement(l,{dividers:!0},e.createElement("div",{style:{width:"100%",height:400,display:"flex",justifyContent:"center",alignItems:"center"}},e.createElement(o,null)))))}}export{s as default};

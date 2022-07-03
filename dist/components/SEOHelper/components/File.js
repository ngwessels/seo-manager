import e from"react";import"../styles.css.js";import i from"../../../node_modules/@mui/icons-material/InfoOutlined.js";import{firebase as t}from"../../../firebase.js";import{getStorage as s}from"../../../node_modules/@firebase/storage/dist/index.esm2017.js";import{n as o}from"../../../node_modules/@firebase/auth/dist/esm2017/index-58473f72.js";import"../../../node_modules/@firebase/app/dist/esm/index.esm2017.js";import"../../../node_modules/@firebase/logger/dist/esm/index.esm2017.js";import r from"./FileDetails.js";import n from"../../../node_modules/@mui/material/Typography/Typography.js";s(t),o(t);class m extends e.Component{constructor(e){super(e),this.isImage=()=>this.state.imageTypes.find((e=>e===this.props.item.contentType)),this.state={imageTypes:["image/png","image/jpg","image/jpeg","image/webp","image/apng","image/avif","image/gif","image/svg+xml"],fileDetail:!1}}render(){var t,s,o,m,l;const a=this.isImage();return e.createElement(e.Fragment,null,e.createElement(r,{onClose:()=>{this.setState({fileDetail:!1})},open:this.state.fileDetail,onDelete:this.props.onDelete,file:this.props.item,idx:this.props.idx,isImage:a}),e.createElement("div",{style:{border:this.props.isClicked?"2px solid #8a8a8a":"1px dashed #e3e3e3"},className:"image-container"},e.createElement("div",{style:{width:"100%",position:"relative"}},e.createElement("div",{style:{position:"absolute",right:-15,top:-15}},e.createElement(i,{fontSize:"medium",onClick:()=>{this.setState({fileDetail:!0})},style:{cursor:"pointer",backgroundColor:"white",borderRadius:100}}))),a&&e.createElement("img",{src:null===(t=this.props.item)||void 0===t?void 0:t.url,width:(null===(o=null===(s=this.props.item)||void 0===s?void 0:s.dimensions)||void 0===o?void 0:o.width)||"100%",height:(null===(l=null===(m=this.props.item)||void 0===m?void 0:m.dimensions)||void 0===l?void 0:l.height)||"auto",onClick:this.props.onClick,style:{width:"100%",height:"100%",objectFit:"contain",cursor:"pointer",zIndex:0}}),!a&&e.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",cursor:"pointer"},onClick:this.props.onClick},e.createElement(n,{textAlign:"center"},this.props.item.fileName||this.props.item.contentType))))}}export default m;
//# sourceMappingURL=File.js.map
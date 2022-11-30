import e from"react";import{getApps as t,initializeApp as a,getApp as n}from"firebase/app";import{getAnalytics as r}from"firebase/analytics";function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}const i="Test"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER&&"Development"!==process.env.NEXT_PUBLIC_NODE_ENV_MANAGER?{apiKey:"AIzaSyDPjpRmobrdUtIY3hIaNoyox7alxYJH_B8",authDomain:"seo-manager-live.firebaseapp.com",projectId:"seo-manager-live",storageBucket:"seo-manager-live.appspot.com",messagingSenderId:"510256510596",appId:"1:510256510596:web:eae1ccc42cb103b8a7f4d1",measurementId:"G-RED1HCM49W"}:{apiKey:"AIzaSyBD6KEJFm2SVguRDEiqufIlRo5HuHu0IZg",authDomain:"seo-manager-test.firebaseapp.com",projectId:"seo-manager-test",storageBucket:"seo-manager-test.appspot.com",messagingSenderId:"682714204028",appId:"1:682714204028:web:a782b9da96ce811ee606f9",measurementId:"G-PYZDK47B2M"};let l;const c=t()?.findIndex((e=>{if("seo-manager"===e?.name)return!0}));l=c<0?a(i,"seo-manager"):n("seo-manager");var m=l;class s extends e.Component{constructor(t){super(t),o(this,"componentDidMount",(()=>{console.log("SEOHelperLite Mounted:",Date.now()),this.setState({loading:!1,loaded:!0}),r(m)})),o(this,"checkComponentErrors",(e=>{if(console.log("Object:",e),!e.head)throw"Please add this tag to your SEOHelper component 'head={(data) => (<Head>{data}</Head>)}'. If your not using NextJS replace <Head>{data}</Head> with <Helmet>{data}</Helmet> from npm react-helmet."})),o(this,"formatHead",(t=>t&&!1!==t.valid?e.createElement(e.Fragment,null,e.createElement("title",null,t.title||t?.defaultTitle||""),e.createElement("meta",{name:"description",content:t.description||t.defaultDescription||"",key:"description"}),t.keywords&&e.createElement("meta",{name:"keywords",content:t.keywords}),t.canonicalURL&&e.createElement("link",{href:`${t.canonicalURL}${t.path}`,rel:"canonical"}),e.createElement("meta",{property:"og:locale",content:"en_US"}),e.createElement("meta",{property:"og:type",content:"website"}),t.title&&e.createElement("meta",{property:"og:title",content:t.title||response?.error}),t.description&&e.createElement("meta",{property:"og:description",content:t.description||t.defaultDescription}),t?.image?.url&&e.createElement("meta",{property:"og:image",content:t.image.url}),t.canonicalURL&&e.createElement("meta",{property:"og:url",content:`${t.canonicalURL}${t.path}`}),t.title&&e.createElement("meta",{name:"twitter:title",content:t.title||response?.error}),t.description&&e.createElement("meta",{name:"twitter:description",content:t.description||t.defaultDescription}),t?.image?.url&&e.createElement("meta",{name:"twitter:image",content:t.image.url}),(t.pageFavicon||t.projectFavicon)&&e.createElement("link",{rel:"icon",type:"image/x-icon",href:t.pageFavicon||t.projectFavicon,sizes:"192x192"}),e.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),e.createElement("meta",{name:"robots",content:`${t.index||"index"}, ${t.follow||"follow"}`}),t.ldJson&&e.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:t.ldJson}}),t.events&&e.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(t.events)}}),this.props.children):null)),this.checkComponentErrors(t),this.state={data:t.data,head:t.head(this.formatHead(t.data)),loading:!0,loaded:!1}}render(){return e.createElement(e.Fragment,null,!1===this.state.loaded?e.createElement(e.Fragment,null,this.state.head):e.createElement(e.Fragment,null,this.props.head(this.formatHead(this.state.data))))}}export{s as default};
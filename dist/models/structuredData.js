class e{constructor(){this.type={index:"@type",type:"select",value:"Event",label:""},this.name={index:"name",type:"input",required:!0,label:"Event Name"},this.startDate={index:"startDate",type:"date-time",required:!0,label:"Start of Event"},this.endDate={index:"endDate",type:"date-time",required:!0,label:"End of Event"},this.eventAttendanceMode={index:"eventAttendanceMode",label:"Event Attendance Type",type:"select",selection:[{title:"Offline",data:"https://schema.org/OfflineEventAttendanceMode"},{title:"Online",data:"https://schema.org/OnlineEventAttendanceMode"},{title:"Offline & Online",data:"https://schema.org/MixedEventAttendanceMode"}],required:!0},this.eventStatus={index:"eventStatus",label:"Event Status",type:"select",defaultValue:"https://schema.org/EventScheduled",selection:[{title:"Event Scheduled",data:"https://schema.org/EventScheduled"},{title:"Event Rescheduled",data:"https://schema.org/EventRescheduled"},{title:"Event Cancelled",data:"https://schema.org/EventCancelled"}],required:!0},this.previousStartDate={hidden:"https://schema.org/EventRescheduled"!==this.eventStatus.value,index:"previousStartDate",type:"date-time",defaultValue:this.startDate.value,label:"Previous Start Date",required:"https://schema.org/EventRescheduled"!==this.eventStatus.value},this.location={index:"location",type:"location",required:!0,template:{"@type":"Place",name:"",address:{"@type":"PostalAddress",streetAddress:"",addressLocality:"",postalCode:"",addressRegion:"",addressCountry:"US"}}},this.image={index:"image",type:"images",required:!1},this.description={index:"description",type:"textfield",label:"Event Description",defaultValue:"",required:!0,maxChar:250,showCharCount:!0},this.offers={index:"offers",type:"offers",classType:t,required:!1},this.performer={index:"performer",type:"performer",classType:a,required:!1},this.organizer={index:"organizer",type:"organizer",classType:r,required:!1},this.structure=["type","image","name","description","eventAttendanceMode","eventStatus","startDate","endDate","previousStartDate","location","organizer","offers","performer"]}}class t{constructor(){this.type={index:"@type",type:"select",defaultValue:"Offer",selection:[{title:"Offer",data:"Offer"}],required:!0},this.url={index:"url",type:"input",defaultValue:"",required:!0},this.price={index:"price",type:"input",inputType:"number",defaultValue:"",required:!0},this.priceCurrency={index:"@type",type:"select",defaultValue:"Offer",selection:[{title:"US Dollar",data:"USD"}],required:!0},this.availability={index:"availability",type:"select",defaultValue:"https://schema.org/InStock",selection:[{title:"In Stock",data:"https://schema.org/InStock"}],required:!0},this.validFrom={index:"validFrom",type:"date-time",defaultValue:"",required:!0},this.structure=["type","url","price","priceCurrency","availability","validFrom"]}}class a{constructor(){this.type={index:"@type",type:"select",defaultValue:"PerformingGroup",selection:[{title:"PerformingGroup",data:"PerformingGroup"}],required:!0},this.name={index:"name",type:"input",defaultValue:"",required:!0},this.structure=["type","name"]}}class r{constructor(){this.type={index:"@type",type:"select",defaultValue:"PerformingGroup",selection:[{title:"PerformingGroup",data:"PerformingGroup"}],required:!0},this.name={index:"name",type:"input",defaultValue:"",required:!0},this.url={index:"url",type:"input",defaultValue:"",required:!0},this.structure=["type","name","url"]}}export{e as EventModel,t as Offers,r as Organizer,a as Performer};
//# sourceMappingURL=structuredData.js.map

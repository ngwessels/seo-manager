/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unneeded-ternary */
export class EventModel {
  type: any;
  name: any;
  startDate: any;
  endDate: any;
  eventAttendanceMode: any;
  eventStatus: any;
  previousStartDate: any;
  location: any;
  image: any;
  description: any;
  offers: any;
  performer: any;
  organizer: any;
  structure: any;

  constructor() {
    this.type = {
      index: "@type",
      type: "select",
      value: "Event",
      label: ""
    };
    this.name = {
      index: "name",
      type: "input",
      required: true,
      label: "Event Name"
    };
    this.startDate = {
      index: "startDate",
      type: "date-time",
      required: true,
      label: "Start of Event"
    };
    this.endDate = {
      index: "endDate",
      type: "date-time",
      required: true,
      label: "End of Event"
    };
    this.eventAttendanceMode = {
      index: "eventAttendanceMode",
      label: "Event Attendance Type",
      type: "select",
      selection: [
        {
          title: "Offline",
          data: "https://schema.org/OfflineEventAttendanceMode"
        },
        {
          title: "Online",
          data: "https://schema.org/OnlineEventAttendanceMode"
        },
        {
          title: "Offline & Online",
          data: "https://schema.org/MixedEventAttendanceMode"
        }
      ],
      required: true
    };
    this.eventStatus = {
      index: "eventStatus",
      label: "Event Status",
      type: "select",
      defaultValue: "https://schema.org/EventScheduled",
      selection: [
        { title: "Event Scheduled", data: "https://schema.org/EventScheduled" },
        {
          title: "Event Rescheduled",
          data: "https://schema.org/EventRescheduled"
        },
        { title: "Event Cancelled", data: "https://schema.org/EventCancelled" }
      ],
      required: true
    };
    this.previousStartDate = {
      hidden:
        this.eventStatus.value !== "https://schema.org/EventRescheduled"
          ? true
          : false,
      index: "previousStartDate",
      type: "date-time",
      defaultValue: this.startDate.value,
      label: "Previous Start Date",
      required:
        this.eventStatus.value !== "https://schema.org/EventRescheduled"
          ? true
          : false
    };
    this.location = {
      index: "location",
      type: "location",
      required: true,
      template: {
        "@type": "Place",
        name: "",
        address: {
          "@type": "PostalAddress",
          streetAddress: "",
          addressLocality: "",
          postalCode: "",
          addressRegion: "",
          addressCountry: "US"
        }
      }
    };
    this.image = {
      index: "image",
      type: "images",
      required: false
    };
    this.description = {
      index: "description",
      type: "textfield",
      label: "Event Description",
      defaultValue: "",
      required: true,
      maxChar: 250,
      showCharCount: true
    };
    this.offers = {
      index: "offers",
      type: "offers",
      classType: Offers,
      required: false
    };
    this.performer = {
      index: "performer",
      type: "performer",
      classType: Performer,
      required: false
    };
    this.organizer = {
      index: "organizer",
      type: "organizer",
      classType: Organizer,
      required: false
    };
    this.structure = [
      "type",
      "image",
      "name",
      "description",
      "eventAttendanceMode",
      "eventStatus",
      "startDate",
      "endDate",
      "previousStartDate",
      "location",
      "organizer",
      "offers",
      "performer"
    ];
  }
}

export class Offers {
  type: any;
  url: any;
  price: any;
  priceCurrency: any;
  availability: any;
  validFrom: any;
  structure: any;

  constructor() {
    this.type = {
      index: "@type",
      type: "select",
      defaultValue: "Offer",
      selection: [{ title: "Offer", data: "Offer" }],
      required: true
    };
    this.url = {
      index: "url",
      type: "input",
      defaultValue: "",
      required: true
    };
    this.price = {
      index: "price",
      type: "input",
      inputType: "number",
      defaultValue: "",
      required: true
    };
    this.priceCurrency = {
      index: "@type",
      type: "select",
      defaultValue: "Offer",
      selection: [{ title: "US Dollar", data: "USD" }],
      required: true
    };
    this.availability = {
      index: "availability",
      type: "select",
      defaultValue: "https://schema.org/InStock",
      selection: [{ title: "In Stock", data: "https://schema.org/InStock" }],
      required: true
    };
    this.validFrom = {
      index: "validFrom",
      type: "date-time",
      defaultValue: "",
      required: true
    };
    this.structure = [
      "type",
      "url",
      "price",
      "priceCurrency",
      "availability",
      "validFrom"
    ];
  }
}

export class Performer {
  type: any;
  name: any;
  structure: any;

  constructor() {
    this.type = {
      index: "@type",
      type: "select",
      defaultValue: "PerformingGroup",
      selection: [{ title: "PerformingGroup", data: "PerformingGroup" }],
      required: true
    };
    this.name = {
      index: "name",
      type: "input",
      defaultValue: "",
      required: true
    };
    this.structure = ["type", "name"];
  }
}

export class Organizer {
  type: any;
  name: any;
  url: any;
  structure: any;

  constructor() {
    this.type = {
      index: "@type",
      type: "select",
      defaultValue: "PerformingGroup",
      selection: [{ title: "PerformingGroup", data: "PerformingGroup" }],
      required: true
    };
    this.name = {
      index: "name",
      type: "input",
      defaultValue: "",
      required: true
    };
    this.url = {
      index: "url",
      type: "input",
      defaultValue: "",
      required: true
    };
    this.structure = ["type", "name", "url"];
  }
}

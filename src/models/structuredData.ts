/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unneeded-ternary */
export class Event {
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
      defaultValue: "Event",
      selection: [{ title: "Event", data: "Event" }],
      required: true
    };
    this.name = {
      index: "name",
      type: "input",
      required: true
    };
    this.startDate = {
      index: "startDate",
      type: "date-time",
      required: true
    };
    this.endDate = {
      index: "endDate",
      type: "date-time",
      required: true
    };
    this.eventAttendanceMode = {
      index: "eventAttendanceMode",
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
      required:
        this.eventStatus.value !== "https://schema.org/EventRescheduled"
          ? true
          : false
    };
    this.location = {
      index: "location",
      type: "location",
      required: true
    };
    this.image = {
      index: "image",
      type: "images",
      required: false
    };
    this.description = {
      index: "description",
      type: "textfield",
      defaultValue: "",
      required: true,
      minChar: 25,
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
      "name",
      "startDate",
      "endDate",
      "eventAttendanceMode",
      "eventStatus",
      "previousStartDate",
      "location",
      "image",
      "description",
      "offers",
      "performer",
      "organizer"
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

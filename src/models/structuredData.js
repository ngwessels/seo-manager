/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unneeded-ternary */
export class EventModel {
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
      visibleWhen: {
        index: "eventStatus",
        value: "https://schema.org/EventRescheduled"
      },
      index: "previousStartDate",
      type: "date-time",
      defaultValue: this.startDate.value,
      label: "Previous Start Date",
      required: true
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
      required: false,
      template: {
        "@type": "Offer",
        url: "",
        price: "",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: ""
      }
    };
    this.performer = {
      index: "performer",
      type: "performer",
      classType: Performer,
      required: false,
      template: {
        "@type": "PerformingGroup",
        name: ""
      }
    };
    this.organizer = {
      index: "organizer",
      type: "organizer",
      classType: Organizer,
      required: false,
      template: {
        "@type": "Organization",
        name: "",
        url: ""
      }
    };

    this.format = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      eventAttendanceMode: "",
      eventStatus: "",
      location: {
        "@type": "Place",
        name: "",
        address: {
          "@type": "PostalAddress",
          streetAddress: "",
          addressLocality: "",
          postalCode: "",
          addressRegion: "",
          addressCountry: ""
        }
      },
      image: [],
      description: ""
      // offers: {
      //   "@type": "Offer",
      //   url: "https://www.example.com/event_offer/12345_201803180430",
      //   price: "30",
      //   priceCurrency: "USD",
      //   availability: "https://schema.org/InStock",
      //   validFrom: "2024-05-21T12:00"
      // },
      // performer: {
      //   "@type": "PerformingGroup",
      //   name: "Kira and Morrison"
      // },
      // organizer: {
      //   "@type": "Organization",
      //   name: "Kira and Morrison Music",
      //   url: "https://kiraandmorrisonmusic.com"
      // }
    };
    this.structure = [
      "type",
      "image",
      "name",
      "description",
      "eventAttendanceMode",
      "eventStatus",
      "previousStartDate",
      "startDate",
      "endDate",
      "location",
      "organizer",
      "offers",
      "performer"
    ];
  }
}

export class Offers {
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

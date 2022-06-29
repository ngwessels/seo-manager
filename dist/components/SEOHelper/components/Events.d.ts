import React from "react";
import "../styles.css";
declare type EventsObject = {
    events: any;
};
declare class Events extends React.Component<{
    events: any;
}> {
    state: {};
    constructor(object: EventsObject);
    addEvent: () => void;
    updateEvent: (idx: number) => void;
    closeModal: () => void;
    render(): JSX.Element;
}
export default Events;

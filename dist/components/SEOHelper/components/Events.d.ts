import React from "react";
import "../styles.css";
declare type EventsObject = {
    events: any;
    data: any;
    onChangeComplete: any;
};
declare class Events extends React.Component<{
    events: any;
    data: any;
    onChangeComplete: any;
}> {
    state: {
        eventModalOpen: boolean;
        isNewEvent: boolean;
        updatingEventIdx: number;
    };
    constructor(object: EventsObject);
    addEvent: () => void;
    updateEvent: (idx: number) => void;
    closeModal: () => void;
    render(): JSX.Element;
}
export default Events;

import React from "react";
import "../styles.css";
declare type FormObject = {
    onClose: any;
    open: boolean;
    onDelete: any;
    onChangeComplete: any;
    model: any;
    data?: any;
    idx: any;
    title: string;
};
declare class Form extends React.Component<{
    onClose: any;
    open: boolean;
    onDelete: any;
    onChangeComplete: any;
    model: any;
    data?: any;
    idx: any;
    title: string;
}> {
    state: {
        data: any;
    };
    constructor(object: FormObject);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: FormObject) => void;
    render(): JSX.Element;
}
export default Form;

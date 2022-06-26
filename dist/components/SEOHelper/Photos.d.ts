import React from "react";
import "./styles.css";
declare type SEOObject = {
    selected: any;
    onChangeComplete: any;
    onClose: any;
    multiple?: boolean;
    open: boolean;
    maxFiles?: number;
};
declare class SEOHelper extends React.Component<{
    selected?: any;
    onChangeComplete: any;
    onClose: any;
    multiple?: boolean;
    open: boolean;
    maxFiles?: number;
}> {
    state: {
        photos: any;
        loading: boolean;
        selected: any;
        selectedArray: any;
    };
    constructor(object: SEOObject);
    componentDidMount: () => void;
    getData: () => Promise<void>;
    imageClicked: (file: any) => void;
    save: () => void;
    render(): JSX.Element;
}
export default SEOHelper;

import React from "react";
declare type SEOObject = {
    children?: React.ReactNode;
    head: any;
    data: any;
};
declare class SEOHelperLite extends React.Component<{
    children?: React.ReactNode;
    data: any;
    head: any;
}, {
    data: any;
    head: any;
}> {
    state: {
        data: any;
        head: any;
        loading: boolean;
    };
    constructor(object: SEOObject);
    componentDidMount: () => void;
    checkComponentErrors: (object: SEOObject) => void;
    formatHead: (data: any) => JSX.Element | null;
    render(): JSX.Element;
}
export default SEOHelperLite;

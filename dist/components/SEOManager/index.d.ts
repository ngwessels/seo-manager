import React from "react";
declare type SEOObject = {
    children?: React.ReactNode;
    data: any;
};
declare class SEOHelper extends React.Component<{
    children?: React.ReactNode;
    path?: string;
}, {
    data: any;
}> {
    state: {
        data: any;
    };
    constructor(object: SEOObject);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default SEOHelper;

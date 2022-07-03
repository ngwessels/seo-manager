import React from "react";
declare type PhotoObject = {
    files: any[];
    onChangeComplete: any;
    multiple: boolean;
    accept: string;
    data: any;
};
declare class PagePhotos extends React.Component<{
    files: any[];
    onChangeComplete: any;
    multiple: boolean;
    accept: string;
    data: any;
}> {
    state: {
        files: any[];
        openPhotoManager: boolean;
        autoAdvancedInterval: any;
        buttonListeners: boolean;
        started: boolean;
    };
    constructor(object: PhotoObject);
    componentDidUpdate: (prevProps: any) => void;
    componentDidMount: () => void;
    compileData: () => void;
    render(): JSX.Element;
}
export default PagePhotos;

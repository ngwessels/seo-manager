import React from "react";
import "../styles.css";
declare type SEOObject = {
    selected: any;
    onChangeComplete: any;
    onClose: any;
    multiple?: boolean;
    open: boolean;
    maxFiles?: number;
    data: any;
    accept?: string;
};
declare class SEOHelper extends React.Component<{
    selected?: any;
    onChangeComplete: any;
    onClose: any;
    multiple?: boolean;
    open: boolean;
    maxFiles?: number;
    data: any;
    accept?: string;
}> {
    state: {
        files: any;
        loading: boolean;
        selected: any;
        selectedArray: any;
        fileError: any;
        uploadProgress: any;
    };
    constructor(object: SEOObject);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: SEOObject) => void;
    getData: () => Promise<void>;
    imageClicked: (file: any) => void;
    addFile: (e: any) => void;
    uploadNewFile: (newFiles: any) => Promise<unknown>;
    save: () => void;
    fileDeleted: (item: any, idx: any) => void;
    render(): JSX.Element;
}
export default SEOHelper;

import React from "react";
import "../styles.css";
declare type FileDetailsObject = {
    onClose: any;
    open: boolean;
    onDelete: any;
    file: any;
    isImage: boolean;
    idx: any;
};
declare class FileDetails extends React.Component<{
    onClose: any;
    open: boolean;
    onDelete: any;
    file: any;
    isImage: boolean;
    idx: any;
}> {
    state: {
        deleteLoading: boolean;
    };
    constructor(object: FileDetailsObject);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: FileDetailsObject) => void;
    deleteFile: () => Promise<void>;
    render(): JSX.Element;
}
export default FileDetails;

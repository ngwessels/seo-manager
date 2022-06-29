import React from "react";
import "../styles.css";
declare type FileObject = {
    isClicked: any;
    onDelete: any;
    onClick: any;
    item: any;
    idx: any;
};
export default class File extends React.Component<{
    isClicked: any;
    onClick: any;
    item: any;
    idx: any;
    onDelete: any;
}> {
    state: {
        imageTypes: any[];
        fileDetail: boolean;
    };
    constructor(object: FileObject);
    isImage: () => any;
    render(): JSX.Element;
}
export {};

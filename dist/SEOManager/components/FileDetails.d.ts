import React from "react";
import "../styles.css";
import { FileDetailsInterface } from "../interfaces";
interface State {
    deleteLoading: boolean;
}
declare class FileDetails extends React.Component<FileDetailsInterface, State> {
    constructor(props: FileDetailsInterface);
    componentDidMount: () => void;
    deleteFile: () => Promise<void>;
    render(): JSX.Element;
}
export default FileDetails;

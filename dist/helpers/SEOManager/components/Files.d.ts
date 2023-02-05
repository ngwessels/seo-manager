import React from "react";
import "../styles.css";
import { FilesOptions } from "../interfaces";
interface State {
    files: any;
    loading: boolean;
    selected: any;
    selectedArray: any;
    uploadProgress: any;
    fileError: string;
}
declare class Files extends React.Component<FilesOptions, State> {
    constructor(props: FilesOptions);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: FilesOptions) => void;
    getData: () => Promise<void>;
    imageClicked: (file: any) => void;
    addFile: (e: any) => void;
    uploadNewFile: (newFiles: any) => Promise<unknown>;
    save: () => void;
    fileDeleted: (item: any, idx: any) => void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Files, {
    onClose: any;
    onChangeComplete: any;
    ref?: React.LegacyRef<Files> | undefined;
    key?: React.Key | null | undefined;
    open: boolean;
    accept: string;
    multiple: boolean;
    selected: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

import React from "react";
import "../styles.css";
import { FileOptions } from "../interfaces";
interface State {
    imageTypes: any;
    fileDetail: boolean;
}
declare class File extends React.Component<FileOptions, State> {
    constructor(props: FileOptions);
    isImage: () => any;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof File, {
    ref?: React.LegacyRef<File> | undefined;
    key: string;
    onClick: any;
    item: any;
    onDelete: any;
    isClicked: any;
    idx: number;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

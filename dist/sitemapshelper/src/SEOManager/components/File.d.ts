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
    render(): React.JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof File, {
    ref?: React.Ref<File> | undefined;
    key: string;
    onClick: any;
    item: any;
    isClicked: any;
    idx: number;
    onDelete: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

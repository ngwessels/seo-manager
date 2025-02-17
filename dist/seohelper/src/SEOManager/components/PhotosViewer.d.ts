import React from "react";
import { PhotosViewerOptions } from "../interfaces";
interface State {
    files: any;
    openPhotoManager: boolean;
    autoAdvancedInterval: any;
    started: boolean;
}
declare class PhotosViewer extends React.Component<PhotosViewerOptions, State> {
    constructor(object: PhotosViewerOptions);
    componentDidUpdate: (prevProps: PhotosViewerOptions) => void;
    componentDidMount: () => void;
    compileData: () => void;
    render(): React.JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof PhotosViewer, {
    files: any;
    onChangeComplete: any;
    multiple: boolean;
    accept: string;
    ref?: React.Ref<PhotosViewer> | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

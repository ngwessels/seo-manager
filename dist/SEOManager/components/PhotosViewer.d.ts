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
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof PhotosViewer, {
    ref?: React.LegacyRef<PhotosViewer> | undefined;
    key?: React.Key | null | undefined;
    onChangeComplete: any;
    accept: string;
    multiple: boolean;
    files: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

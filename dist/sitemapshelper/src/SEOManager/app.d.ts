import React from "react";
import { Options } from "./interfaces";
interface State {
    authentication: boolean;
    isManagerOpen: boolean;
}
declare class App extends React.Component<Options, State> {
    constructor(props: Options);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: any) => void;
    clickToOpenManager: () => void;
    clickToCloseManager: () => void;
    onChangeComplete: (e: any) => void;
    render(): React.JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof App, {
    onClose?: any;
    ref?: React.Ref<App> | undefined;
    key?: React.Key | null | undefined;
    data?: any;
    onOpen?: any;
    isManagerOpen?: boolean | undefined;
    isNewPage?: boolean | undefined;
    onChangeComplete: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

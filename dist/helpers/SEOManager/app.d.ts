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
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof App, {
    isNewPage?: boolean | undefined;
    data?: any;
    onClose?: any;
    onOpen?: any;
    isManagerOpen?: boolean | undefined;
    onChangeComplete: any;
    ref?: React.LegacyRef<App> | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

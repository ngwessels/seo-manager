import React from "react";
interface State {
    interval: any;
    userToken: string;
}
interface Props {
    user?: any;
    seoData?: any;
}
declare class OpenDashboard extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    init: () => void;
    setUserToken: () => Promise<void>;
    openWindow: () => void;
    render(): JSX.Element | null;
}
declare const _default: import("react-redux").ConnectedComponent<typeof OpenDashboard, {
    ref?: React.LegacyRef<OpenDashboard> | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

import React from "react";
import { DialogScreens } from "../interfaces";
interface State {
    loading: boolean;
    loginError: string;
    userSetup: boolean;
    userAuthorized: boolean;
    userLoaded: boolean;
}
declare class Login extends React.Component<DialogScreens, State> {
    constructor(props: DialogScreens);
    componentDidMount: () => void;
    componentDidUpdate: (prevProps: any) => void;
    userLoginSetup: () => void;
    render(): React.JSX.Element | null;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Login, {
    ref?: React.Ref<Login> | undefined;
    key?: React.Key | null | undefined;
    onClose: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

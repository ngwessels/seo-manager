import React from "react";
import { DialogScreens } from "../interfaces";
interface State {
    loading: boolean;
    loginError: string;
    email: string;
    password: string;
}
declare class NotAuthorized extends React.Component<DialogScreens, State> {
    constructor(props: DialogScreens);
    signOut: () => Promise<void>;
    render(): React.JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof NotAuthorized, {
    ref?: React.Ref<NotAuthorized> | undefined;
    key?: React.Key | null | undefined;
    onClose: any;
    seoData?: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

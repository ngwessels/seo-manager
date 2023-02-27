import React from "react";
import { DialogScreens } from "../interfaces";
interface State {
    loading: boolean;
    loginError: string;
    email: string;
    password: string;
}
declare class Login extends React.Component<DialogScreens, State> {
    constructor(props: DialogScreens);
    signIn: (e: any) => Promise<void>;
    signOut: () => Promise<void>;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Login, {
    ref?: React.LegacyRef<Login> | undefined;
    key?: React.Key | null | undefined;
    onClose: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

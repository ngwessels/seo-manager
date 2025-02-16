import React from "react";
import { Options } from "../interfaces";
interface State {
    loading: boolean;
    projectId: string;
}
declare class Screens extends React.Component<Options, State> {
    constructor(props: Options);
    onClose: () => void;
    setLoading: (bool: boolean) => void;
    render(): React.JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Screens, {
    ref?: React.Ref<Screens> | undefined;
    key?: React.Key | null | undefined;
    onClose?: any;
    data?: any;
    onOpen?: any;
    isManagerOpen?: boolean | undefined;
    isNewPage?: boolean | undefined;
    onChangeComplete: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

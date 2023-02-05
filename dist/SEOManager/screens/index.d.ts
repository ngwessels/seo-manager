import React from "react";
import { Options } from "./../interfaces";
interface State {
    loading: boolean;
    projectId: string;
}
declare class Screens extends React.Component<Options, State> {
    constructor(props: Options);
    onClose: () => void;
    setLoading: (bool: boolean) => void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Screens, {
    isNewPage?: boolean | undefined;
    data?: any;
    onClose?: any;
    onOpen?: any;
    isManagerOpen?: boolean | undefined;
    onChangeComplete: any;
    ref?: React.LegacyRef<Screens> | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

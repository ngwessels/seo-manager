import React from "react";
import { ManagerOptions } from "../interfaces";
interface State {
    savedLocations: any;
    loading: boolean;
    saving: boolean;
    newImage: string;
    file: any;
    performActionOnUpdate: any;
    photoManager: boolean;
    tabIndex: number;
    isNewPage: boolean;
    data?: any;
    isMobile: boolean;
}
declare class Manager extends React.Component<ManagerOptions, State> {
    constructor(props: ManagerOptions);
    componentDidMount: () => Promise<void>;
    onPageChange: (value: any, location: any) => void;
    onGlobalChange: (value: any, location: any) => void;
    addPerformAction: (e: any, type: any) => void;
    saveData: () => void;
    authSignOut: () => Promise<void>;
    render(): JSX.Element | null;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Manager, {
    ref?: React.LegacyRef<Manager> | undefined;
    data?: any;
    key?: React.Key | null | undefined;
    onClose?: any;
    onOpen?: any;
    isManagerOpen?: boolean | undefined;
    isNewPage?: boolean | undefined;
    onChangeComplete: any;
    isLoading: boolean;
    onIsLoading: any;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").AnyAction>> | undefined;
    store?: import("redux").Store<any, import("redux").AnyAction> | undefined;
}>;
export default _default;

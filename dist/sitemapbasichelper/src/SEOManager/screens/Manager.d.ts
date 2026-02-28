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
    aiEnabled: boolean;
    aiAutonomousAll: boolean;
    aiPageAutonomous: boolean;
    aiSaving: boolean;
}
declare class Manager extends React.Component<ManagerOptions, State> {
    constructor(props: ManagerOptions);
    componentDidMount: () => Promise<void>;
    onPageChange: (value: any, location: any) => void;
    onGlobalChange: (value: any, location: any) => void;
    addPerformAction: (e: any, type: any) => void;
    saveData: () => void;
    authSignOut: () => Promise<void>;
    updatePageAiInRedux: (ai: any) => void;
    updateGlobalAiInRedux: (ai: any) => void;
    toggleProjectAI: (field: "aiEnabled" | "aiAutonomousAll", value: boolean) => Promise<void>;
    togglePageAutonomous: (value: boolean) => Promise<void>;
    render(): React.JSX.Element | null;
}
declare const _default: import("react-redux").ConnectedComponent<typeof Manager, {
    isNewPage?: boolean | undefined;
    data?: any;
    onClose?: any;
    onOpen?: any;
    isManagerOpen?: boolean | undefined;
    isLoading: boolean;
    onIsLoading: any;
    onChangeComplete: any;
    ref?: React.Ref<Manager> | undefined;
    key?: React.Key | null | undefined;
    context?: React.Context<import("react-redux").ReactReduxContextValue<any, import("redux").UnknownAction> | null> | undefined;
    store?: import("redux").Store<any, import("redux").UnknownAction, unknown> | undefined;
}>;
export default _default;

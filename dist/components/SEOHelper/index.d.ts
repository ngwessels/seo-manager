import React from "react";
import "./styles.css";
declare type SEOObject = {
    children?: React.ReactNode;
    head: any;
    data: any;
    onChangeComplete?: any;
    onClose?: any;
    hideBootstrap?: boolean;
};
declare class SEOHelper extends React.Component<{
    children?: React.ReactNode;
    data: any;
    head: any;
    onChangeComplete: any;
    onClose: any;
    hideBootstrap?: boolean;
}, {
    data: any;
    head: any;
}> {
    state: {
        data: any;
        dataOriginal: any;
        head: any;
        loading: boolean;
        loaded: boolean;
        open: boolean;
        user: any;
        email: string;
        password: string;
        loginError: string;
        projectId: string;
        authorizedUser: boolean;
        openManager: boolean;
    };
    constructor(object: SEOObject);
    componentDidMount: () => void;
    checkComponentErrors: (object: SEOObject) => void;
    formatHead: (data: any) => JSX.Element | null;
    signIn: (e: any) => Promise<void>;
    signOut: () => Promise<void>;
    resetData: () => void;
    updateData: (data: any, original: boolean) => void;
    openManager: (user?: any) => void;
    render(): JSX.Element;
}
export default SEOHelper;

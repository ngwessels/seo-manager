import React from "react";
declare type ManagerObject = {
    data: any;
    dataOriginal: any;
    onChangeComplete?: any;
    onClose?: any;
    onChange: any;
    resetData: any;
    user: any;
};
declare class Manager extends React.Component<{
    data: any;
    onChangeComplete?: any;
    onClose?: any;
    onChange: any;
    dataOriginal: any;
    resetData: any;
    user: any;
}> {
    state: {
        saving: boolean;
        loading: boolean;
        newImage: "";
        file: any;
        performActionOnUpdate: any;
        photoManager: boolean;
        events: any[];
    };
    reactTags: any;
    constructor(object: ManagerObject);
    componentDidMount: () => Promise<void>;
    onChange: (value: any, location: string) => void;
    onDelete: (i: number) => void;
    onAddition: (tag: any) => void;
    addPerformAction: (e: any, type: string) => void;
    saveData: () => void;
    render(): JSX.Element;
}
export default Manager;

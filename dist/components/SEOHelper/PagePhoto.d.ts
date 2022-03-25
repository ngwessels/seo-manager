import React from "react";
declare type PhotoObject = {
    image: string;
    newImage?: string;
    onChange: any;
    addPerformActionOnUpdate: any;
    data: any;
    file: any;
    user: any;
};
declare class PagePhotos extends React.Component<{
    image: string;
    newImage?: string;
    onChange: any;
    addPerformActionOnUpdate: any;
    data: any;
    file: any;
    user: any;
}> {
    state: {
        fileError: string;
    };
    constructor(object: PhotoObject);
    uploadNewFile: () => Promise<unknown>;
    addFile: (e: any) => void;
    deleteFile: () => void;
    render(): JSX.Element;
}
export default PagePhotos;

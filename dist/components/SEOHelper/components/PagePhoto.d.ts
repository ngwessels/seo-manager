import React from "react";
declare type PhotoObject = {
    image: any;
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
        photoManager: boolean;
    };
    constructor(object: PhotoObject);
    deleteFileAction: (fileId: string) => Promise<unknown>;
    deleteFile: () => void;
    render(): JSX.Element;
}
export default PagePhotos;

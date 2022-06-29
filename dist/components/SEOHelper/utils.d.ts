export declare const hideModal: () => void;
export declare const openModal: () => void;
export declare const formattedFileName: (data: any) => string;
export declare const addFiles: (e: any, validContentTypes: any) => {
    results: {
        object: any;
        name: any;
    }[];
};
export declare const authSignOut: () => Promise<void>;

export declare const hideModal: () => void;
export declare const openModal: () => void;
export declare const formattedFileName: (data: any) => string;
export declare const addFiles: (e: any, validContentTypes: any, data: any) => {
    error: string;
    results: boolean;
} | {
    results: {
        object: any;
        name: string;
    }[];
    error?: undefined;
};
export declare const authSignOut: () => Promise<void>;
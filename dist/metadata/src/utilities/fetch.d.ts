export declare const fetch: (path: string, headers?: any) => Promise<{
    results: boolean;
    error: string;
    message: string;
}>;
export declare const getUserToken: () => Promise<string>;

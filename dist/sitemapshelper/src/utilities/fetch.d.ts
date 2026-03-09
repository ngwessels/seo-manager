export declare const fetch: (path: string) => Promise<{
    results: boolean;
    error: string;
    message: string;
}>;
export declare const getUserToken: () => Promise<string>;

import { SEOInitKeys } from "../types";
/**
 * * @name SEOInit
 * @function
 * @param {SEOInitKeys} keys - Object containing secretKey, projectId, and projectKey
 */
export declare const SEOInit: (keys: SEOInitKeys) => boolean;
export declare const returnKey: () => {
    secretKey?: string;
    projectKey?: string;
    projectId?: string;
};
export declare const setProject: (project: any) => void;
export declare const returnProject: () => any | null;

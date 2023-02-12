/**
 * @name SEOInitKeys
 * @param {string} [secretKey] - Your Project Secret Key... This can only be used for our api!
 * @param {string} projectId - Your ProjectId... Needed to initialize the module!
 * @param {string} [projectKey] - Your Project Key... Needed to initialize the frontend module!
 */
export interface SEOInitKeys {
    secretKey?: string;
    projectId: string;
    projectKey?: string;
}
/**
 * @name PageIdentifiers
 * @param {string} path - The current path to the SEO page you would like to insert/update.
 * @param {string} [pageId] - The pageId to the SEO page you would like to update.
 */
export interface PageIdentifiers {
    path: string;
    pageId?: string;
}
/**
 * @name PageSEO
 * @param {string} path - The current path to the SEO page you would like to insert/update.
 * @param {string} title - The title you would like to give this SEO page.
 * @param {string} [description] - The title you would like to give this SEO page.
 */
export interface PageSEO {
    path: string;
    title: string;
    description?: string;
}
/**
 * @name PageOptions
 * @param {boolean} [upsert] - Set to true if you would like to insert this page if it does not already exist. Default false
 */
export interface PageOptions {
    upsert?: boolean;
}
export interface BackendValidationData {
    queueId: string;
}
export interface BackendValidationResponse {
    results: boolean;
    message: string;
    error: boolean;
}
export interface FetchSEOHeaders {
    request?: {
        headers?: object;
    };
}

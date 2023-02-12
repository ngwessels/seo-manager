import { PageIdentifiers, PageSEO, FetchSEOHeaders, PageOptions } from "../types";
/**
 * * @name fetchSEO
 * @function
 * @param {string} path - Path to SEO page
 * @param {FetchSEOHeaders} [meta] - {request: context?.req}
 */
export declare const fetchSEO: (path: string, meta?: FetchSEOHeaders) => Promise<unknown>;
/**
@name backendValidation
@function
@param {any} body - Your req.body
*/
export declare const backendValidation: (body: any) => Promise<unknown>;
export declare const checkBackendKeys: () => void;
/**
@name insertSeoPage
@function
@param {PageIdentifiers[]} pageIdentifiers - Array of {path [Required], pageId [Optional]}
@param {PageSEO[]} pageSEO - Array of {title, description}
*/
export declare function insertSeoPage(pageIdentifiers: PageIdentifiers[], pageSEO: PageSEO[]): Promise<unknown>;
/**
@name updateSeoPage - Update a batch of SEO Pages
@function
@param {PageIdentifiers[]} pageIdentifiers - Array of {path [Required], pageId [Optional]}
@param {PageSEO[]} pageSEO - Array of {title, description}
@param {PageOptions} options - additional options for the batch update
*/
export declare const updateSeoPage: (pageIdentifiers: PageIdentifiers[], pageSEO: PageSEO[], options: PageOptions) => Promise<unknown>;
/**
@name deleteSeoPage
@function
@param {PageIdentifiers[]} pageIdentifiers - Array of {path [Required], pageId [Optional]}
*/
export declare const deleteSeoPage: (pageIdentifiers: PageIdentifiers[]) => Promise<unknown>;
/**
@name getSeoPages
@function
@param {PageIdentifiers} pageIdentifiers - Object of {path [Required], pageId [Optional]}
*/
export declare const getSeoPages: (pageIdentifiers: PageIdentifiers) => Promise<any>;

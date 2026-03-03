import { SEODefaults, SEOMetadataOptions, FetchSEOHeaders } from "../types";
interface CreatePageSEOOptions {
    metadataOptions?: SEOMetadataOptions;
    meta?: FetchSEOHeaders;
}
/**
 * Factory that creates cached SEO helpers for a single page.
 *
 * Uses React cache() so both generateMetadata and getSEOData
 * share a single fetchSEO call per request.
 *
 * @example
 * const pageSEO = createPageSEO("/dinner", DINNER_DEFAULTS);
 * export const generateMetadata = pageSEO.generateMetadata;
 *
 * export default async function Dinner() {
 *   const seo = await pageSEO.getSEOData();
 *   return <AppSEOHelper data={seo} />;
 * }
 */
export declare function createPageSEO(path: string, defaults?: SEODefaults, options?: CreatePageSEOOptions): {
    generateMetadata: () => Promise<any>;
    getSEOData: () => Promise<any>;
};
export {};

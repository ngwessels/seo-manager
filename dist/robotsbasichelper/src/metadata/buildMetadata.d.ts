import { SEODefaults, SEOMetadataOptions } from "../types";
/**
 * Extracts and normalizes SEO fields from a fetchSEO response,
 * falling back to the provided defaults.
 */
export declare function mapFetchSEOToMetadata(seoData: any, defaults?: SEODefaults): {
    title: any;
    description: any;
    keywords: any;
    imageUrl: any;
    canonical: any;
    index: boolean;
    follow: boolean;
    structuredData: any;
};
/**
 * Builds a Next.js App Router metadata object from a fetchSEO response.
 * Shapes into openGraph, twitter, alternates, and robots fields.
 */
export declare function buildMetadataFromSEO(seoData: any, defaults?: SEODefaults, options?: SEOMetadataOptions): any;

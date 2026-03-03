/**
 * Interface for request data needed for sitemap generation
 */
export interface SitemapRequestData {
    path?: string;
    headers?: {
        'user-agent'?: string;
        'accept'?: string;
        'accept-language'?: string;
        'cache-control'?: string;
        [key: string]: string | undefined;
    };
}
/**
 * Generate sitemap XML content using SEO Manager API
 * @param requestData - Request data including path and headers
 * @returns Promise<string> - The sitemap XML content
 */
export declare function generateSitemapXml(requestData?: SitemapRequestData): Promise<string>;
/**
 * Create a basic fallback sitemap XML content
 * @param origin - The origin URL for the website
 * @returns string - Basic sitemap XML content
 */
export declare function createFallbackSitemapXml(origin: string): string;
/**
 * Extract request data from a Next.js request object
 * @param request - Next.js NextRequest object
 * @returns SitemapRequestData
 */
export declare function extractRequestDataFromRequest(request: any): SitemapRequestData;

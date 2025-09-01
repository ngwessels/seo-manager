/**
 * Interface for request headers needed for robots.txt generation
 */
export interface RobotsRequestHeaders {
    'user-agent'?: string;
    'accept'?: string;
    'accept-language'?: string;
    'cache-control'?: string;
    [key: string]: string | undefined;
}
/**
 * Generate robots.txt content using SEO Manager API
 * @param headers - Request headers to pass to the API
 * @returns Promise<string> - The robots.txt content
 */
export declare function generateRobotsTxt(headers?: RobotsRequestHeaders): Promise<string>;
/**
 * Create a basic fallback robots.txt content
 * @param origin - The origin URL for the sitemap
 * @returns string - Basic robots.txt content
 */
export declare function createFallbackRobotsTxt(origin: string): string;
/**
 * Extract headers from a Next.js request object
 * @param request - Next.js NextRequest object
 * @returns RobotsRequestHeaders
 */
export declare function extractHeadersFromRequest(request: any): RobotsRequestHeaders;

import { serverSecretCall } from '../utilities/serverCall';

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
export async function generateRobotsTxt(headers: RobotsRequestHeaders = {}): Promise<string> {
  try {
    const response = await serverSecretCall('/robots/', 'put', {
      headers
    });

    // The API returns { message: "Successful", results: robots_content }
    // serverSecretCall extracts results and returns it in response.results
    if (response.results && typeof response.results === 'string') {
      return response.results;
    }

    // If results is not a string or doesn't exist, throw an error
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (err: any) {
    console.error('Robots.txt generation error:', err);
    throw new Error(`Failed to generate robots.txt: ${err.message || err}`);
  }
}

/**
 * Create a basic fallback robots.txt content
 * @param origin - The origin URL for the sitemap
 * @returns string - Basic robots.txt content
 */
export function createFallbackRobotsTxt(origin: string): string {
  return `User-agent: *
crawl-delay: 2

Sitemap: ${origin}/sitemap.xml`;
}

/**
 * Extract headers from a Next.js request object
 * @param request - Next.js NextRequest object
 * @returns RobotsRequestHeaders
 */
export function extractHeadersFromRequest(request: any): RobotsRequestHeaders {
  return {
    'user-agent': request.headers?.get?.('user-agent') || '',
    'accept': request.headers?.get?.('accept') || '',
    'accept-language': request.headers?.get?.('accept-language') || '',
    'cache-control': request.headers?.get?.('cache-control') || '',
  };
}

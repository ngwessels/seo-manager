import { serverSecretCall } from '../utilities/serverCall';

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
export async function generateSitemapXml(requestData: SitemapRequestData = {}): Promise<string> {
  try {
    const response = await serverSecretCall('/sitemap/', 'put', {
      path: requestData.path,
      headers: requestData.headers || {}
    });

    // The API returns { message: "Successful", results: sitemap_content }
    // serverSecretCall extracts results and returns it in response.results
    if (response.results && typeof response.results === 'string') {
      return response.results;
    }

    // If results is not a string or doesn't exist, throw an error
    throw new Error(`Invalid response format: ${JSON.stringify(response)}`);
  } catch (err: any) {
    console.error('Sitemap generation error:', err);
    throw new Error(`Failed to generate sitemap: ${err.message || err}`);
  }
}

/**
 * Create a basic fallback sitemap XML content
 * @param origin - The origin URL for the website
 * @returns string - Basic sitemap XML content
 */
export function createFallbackSitemapXml(origin: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

/**
 * Extract request data from a Next.js request object
 * @param request - Next.js NextRequest object
 * @returns SitemapRequestData
 */
export function extractRequestDataFromRequest(request: any): SitemapRequestData {
  // Extract just the pathname from the URL for sitemap requests
  const url = new URL(request.url);
  const path = url.pathname;

  return {
    path: path,
    headers: {
      'user-agent': request.headers?.get?.('user-agent') || '',
      'accept': request.headers?.get?.('accept') || '',
      'accept-language': request.headers?.get?.('accept-language') || '',
      'cache-control': request.headers?.get?.('cache-control') || '',
    }
  };
}

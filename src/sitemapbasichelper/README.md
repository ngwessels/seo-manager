# SitemapBasicHelper - Next.js App Router Support

A utility for generating dynamic XML sitemaps in Next.js applications using the App Router. This is part of the `nextjs-seo-manager` npm package.

## Installation

Install the package if you haven't already:

```bash
npm install nextjs-seo-manager
# or
yarn add nextjs-seo-manager
```

## Setup

First, make sure you've initialized the SEO Manager in your Next.js project:

```typescript
// In your Next.js project, initialize the SEO Manager
import { init } from 'nextjs-seo-manager/init';

// Initialize with your project credentials
init({
  projectId: 'your-project-id',
  projectKey: 'your-project-key',
  secretKey: 'your-secret-key' // Only needed for server-side operations
});
```

## Usage in Next.js App Router

### 1. Create the sitemap.xml route

Create the file structure for your sitemap route:

```
app/
  sitemap.xml/
    route.ts
```

### 2. Implement the route handler

Use the `sitemapbasichelper` utilities in your route handler:

```typescript
// app/sitemap.xml/route.ts
import { NextRequest } from 'next/server';
import {
  generateSitemapXml,
  createFallbackSitemapXml,
  extractRequestDataFromRequest
} from 'nextjs-seo-manager/sitemapbasichelper';

export async function GET(request: NextRequest) {
  try {
    // Extract request data from the request
    const requestData = extractRequestDataFromRequest(request);

    // Generate sitemap XML content using SEO Manager
    const sitemapContent = await generateSitemapXml(requestData);

    return new Response(sitemapContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err: any) {
    console.error('Sitemap generation error:', err);

    // Return a basic sitemap as fallback
    const fallbackSitemap = createFallbackSitemapXml(request.nextUrl.origin);

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}
```

### 3. Access your sitemap

Your sitemap.xml will be available at:
- Development: `http://localhost:3000/sitemap.xml`
- Production: `https://yourdomain.com/sitemap.xml`

## API Reference

### `generateSitemapXml(requestData?: SitemapRequestData): Promise<string>`

Generates sitemap XML content using the SEO Manager API.

**Parameters:**
- `requestData` (optional): Request data including path and headers

**Returns:** Promise that resolves to the sitemap XML content string

### `createFallbackSitemapXml(origin: string): string`

Creates a basic fallback sitemap XML content.

**Parameters:**
- `origin`: The origin URL for the website (e.g., `https://yourdomain.com`)

**Returns:** Basic sitemap XML content string

### `extractRequestDataFromRequest(request: NextRequest): SitemapRequestData`

Extracts relevant request data from a Next.js request object.

**Parameters:**
- `request`: Next.js NextRequest object

**Returns:** Object containing extracted request data

### `SitemapRequestData` Interface

```typescript
interface SitemapRequestData {
  path?: string;
  headers?: {
    'user-agent'?: string;
    'accept'?: string;
    'accept-language'?: string;
    'cache-control'?: string;
    [key: string]: string | undefined;
  };
}
```

## Key Differences from Pages Router

- **No React component**: Uses Next.js 13+ App Router route handlers instead of pages
- **GET function export**: Exports a GET function instead of a component with getInitialProps
- **NextRequest/NextResponse**: Uses the new request/response objects
- **Better error handling**: Includes fallback sitemap content
- **Caching headers**: Includes appropriate cache control headers

## Features

- ✅ Dynamic sitemap XML generation via SEO Manager API
- ✅ Automatic fallback to basic sitemap on errors
- ✅ Proper caching headers for performance
- ✅ Full TypeScript support
- ✅ Compatible with Next.js App Router
- ✅ Zero dependencies on Next.js in the package itself

## Integration with robots.txt

Don't forget to reference your sitemap in your robots.txt file:

```txt
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

This is automatically handled when using the `robotsbasichelper` with the fallback robots.txt.

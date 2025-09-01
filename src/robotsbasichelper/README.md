# RobotsBasicHelper - Next.js App Router Support

A utility for generating dynamic robots.txt files in Next.js applications using the App Router. This is part of the `nextjs-seo-manager` npm package.

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

### 1. Create the robots.txt route

Create the file structure for your robots.txt route:

```
app/
  robots.txt/
    route.ts
```

### 2. Implement the route handler

Use the `robotsbasichelper` utilities in your route handler:

```typescript
// app/robots.txt/route.ts
import { NextRequest } from 'next/server';
import {
  generateRobotsTxt,
  createFallbackRobotsTxt,
  extractHeadersFromRequest
} from 'nextjs-seo-manager/robotsbasichelper';

export async function GET(request: NextRequest) {
  try {
    // Extract headers from the request
    const headers = extractHeadersFromRequest(request);

    // Generate robots.txt content using SEO Manager
    const robotsContent = await generateRobotsTxt(headers);

    return new Response(robotsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err: any) {
    console.error('Robots.txt generation error:', err);

    // Return a basic robots.txt as fallback
    const fallbackRobots = createFallbackRobotsTxt(request.nextUrl.origin);

    return new Response(fallbackRobots, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }
}
```

### 3. Access your robots.txt

Your robots.txt will be available at:
- Development: `http://localhost:3000/robots.txt`
- Production: `https://yourdomain.com/robots.txt`

## API Reference

### `generateRobotsTxt(headers?: RobotsRequestHeaders): Promise<string>`

Generates robots.txt content using the SEO Manager API.

**Parameters:**
- `headers` (optional): Request headers to pass to the API

**Returns:** Promise that resolves to the robots.txt content string

### `createFallbackRobotsTxt(origin: string): string`

Creates a basic fallback robots.txt content.

**Parameters:**
- `origin`: The origin URL for the sitemap (e.g., `https://yourdomain.com`)

**Returns:** Basic robots.txt content string

### `extractHeadersFromRequest(request: NextRequest): RobotsRequestHeaders`

Extracts relevant headers from a Next.js request object.

**Parameters:**
- `request`: Next.js NextRequest object

**Returns:** Object containing extracted headers

### `RobotsRequestHeaders` Interface

```typescript
interface RobotsRequestHeaders {
  'user-agent'?: string;
  'accept'?: string;
  'accept-language'?: string;
  'cache-control'?: string;
  [key: string]: string | undefined;
}
```

## Key Differences from Pages Router

- **No React component**: Uses Next.js 13+ App Router route handlers instead of pages
- **GET function export**: Exports a GET function instead of a component with getInitialProps
- **NextRequest/NextResponse**: Uses the new request/response objects
- **Better error handling**: Includes fallback robots.txt content
- **Caching headers**: Includes appropriate cache control headers

## Features

- ✅ Dynamic robots.txt generation via SEO Manager API
- ✅ Automatic fallback to basic robots.txt on errors
- ✅ Proper caching headers for performance
- ✅ Full TypeScript support
- ✅ Compatible with Next.js App Router
- ✅ Zero dependencies on Next.js in the package itself

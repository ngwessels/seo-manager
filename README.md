# Getting Started

## About

The nextjs-seo-manager is a tool for your NextJS website that allows you to setup an Optimized website quickly and effortlessly. This tool is useful for projects that do not want to constantly rebuild their project bundle to update the page's SEO, or your projects robots.txt and/or sitemaps.

There are multiple plans that we offer:

- Free Plan
- Basic Plan
- Advanced Plan

The 'Free Plan' comes with 3 SEO Pages, 1,000 Page SEO fetch requests, 1 authorized user, webhooks usage, 5Mb of file storage.

The 'Basic Plan' has 'pay-as-you-go' so that you will not hit any of the usage limits. But the plan includes 50 SEO Pages, 10,000 Page SEO fetch requests, 3 authorized users, webhooks usage, and 50MB of file storage.

The 'Advanced Plan' also has 'pay-as-you-go' but it also comes with support for our Backend-API. This plan also includes 100 SEO Pages, 20,000 Page SEO fetch requests, 6 authorized users, webhooks usage, and 100MB of file storage.

You can change your plan at any time. You can view our plans [here](https://www.seomanager.dev/pricing).

## Requirements

- Your project must be using [react@18.2.0](https://www.npmjs.com/package/react) and greater.
- Your project must be using [react-dom@18.2.0](https://www.npmjs.com/package/react-dom) and greater.

## How to get started

1. Create your account [Register](https://www.seomanager.dev/register).
2. Create your project [Create Project](https://www.seomanager.dev/new-project).
3. Create your [API Keys](https://www.seomanager.dev/dashboard?pageTitle=Project+Settings). Create both a 'ProjectKey' and a 'ServerKey'. You will need these for later.
4. Install nextjs-seo-manager
   ```jsx
   npm install nextjs-seo-manager
   ```
5. Follow the [Next Step](https://docs.seomanager.dev/?path=/docs/get-setup-seoinit--page)

## withSEO (Pages Router)

Use `withSEO` to wrap `getServerSideProps` (or `withSEOStatic` for `getStaticProps`) and automatically fetch SEO for each page. Add `SEOHelper` once in `_app.js` for centralized SEO rendering.

### Setup

1. Add `SEOHelper` and `SEOInit` to `_app.js`:

```jsx
// pages/_app.js
import Head from "next/head";
import SEOHelper from "nextjs-seo-manager/seohelper";
import SEOInit from "nextjs-seo-manager/init";

SEOInit({
  projectId: process.env.NEXT_PUBLIC_SEO_PROJECT_ID,
  secretKey: process.env.NEXT_PUBLIC_SEO_PROJECT_SECRET_KEY,
  projectKey: process.env.NEXT_PUBLIC_SEO_PROJECT_KEY
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEOHelper data={pageProps.seo ?? {}} head={(data) => <Head>{data}</Head>} />
      <Component {...pageProps} />
    </>
  );
}
```

2. Wrap your page's data fetcher with `withSEO`:

```jsx
// pages/pricing.js
import { withSEO } from "nextjs-seo-manager";

export const getServerSideProps = withSEO(async () => ({ props: {} }));
```

### Path options

- **Default**: Path is inferred from the request URL (`resolvedUrl` or `pathname`).
- **Static path**: `withSEO(handler, { path: '/pricing' })`
- **Dynamic path**: `withSEO(handler, { path: (ctx) => \`/blog/\${ctx.params.slug}\` })`

### getStaticProps

Use `withSEOStatic` for static pages. Pass `path` in options (required for static pages, since the URL is not available at build time):

```jsx
export const getStaticProps = withSEOStatic(async () => ({ props: {} }), {
  path: "/pricing"
});
```

For dynamic routes with `getStaticPaths`, use a path function:

```jsx
export const getStaticProps = withSEOStatic(
  async (ctx) => ({ props: { post: await getPost(ctx.params.slug) } }),
  { path: (ctx) => `/blog/${ctx.params.slug}` }
);
```

## Documentation

You can view the documentation [Here](https://docs.seomanager.dev)

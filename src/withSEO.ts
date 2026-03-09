import { fetchSEO } from "./backend";

export type WithSEOOptions = {
  /**
   * Path for fetchSEO. Omit to infer from context (resolvedUrl or pathname).
   * Use a string for static override, or a function for dynamic routes.
   */
  path?: string | ((context: any) => string);
};

function resolvePath(context: any, options?: WithSEOOptions): string {
  if (options?.path !== undefined) {
    if (typeof options.path === "function") {
      return options.path(context);
    }
    return options.path;
  }
  const fromUrl = context.resolvedUrl?.split("?")[0];
  const fromPathname = context.pathname;
  return fromUrl || fromPathname || "/";
}

/**
 * Wraps getServerSideProps to auto-fetch SEO and merge into props.
 * Use with SEOHelper in _app.js for centralized SEO rendering.
 *
 * @example
 * // Default: infer path from URL
 * export const getServerSideProps = withSEO(async () => ({ props: {} }));
 *
 * @example
 * // Static path override
 * export const getServerSideProps = withSEO(async () => ({ props: {} }), { path: '/pricing' });
 *
 * @example
 * // Dynamic path (e.g. /blog/[slug])
 * export const getServerSideProps = withSEO(
 *   async (ctx) => ({ props: { post: await getPost(ctx.params.slug) } }),
 *   { path: (ctx) => `/blog/${ctx.params.slug}` }
 * );
 */
export function withSEO<T extends (context: any) => any>(
  handler: T,
  options?: WithSEOOptions
): T {
  return (async (context: any) => {
    const result = (await handler?.(context)) ?? { props: {} };
    const path = resolvePath(context, options);
    const seo = await fetchSEO(path);
    return {
      ...result,
      props: {
        ...(result.props || {}),
        seo: seo || {}
      }
    };
  }) as T;
}

/**
 * Wraps getStaticProps to auto-fetch SEO and merge into props.
 * Use with SEOHelper in _app.js for centralized SEO rendering.
 *
 * For static pages, pass path in options. For dynamic routes, use a path function.
 *
 * @example
 * // Static page - path required
 * export const getStaticProps = withSEOStatic(async () => ({ props: {} }), { path: '/pricing' });
 *
 * @example
 * // Dynamic route
 * export const getStaticProps = withSEOStatic(
 *   async (ctx) => ({ props: { post: await getPost(ctx.params.slug) } }),
 *   { path: (ctx) => `/blog/${ctx.params.slug}` }
 * );
 */
export function withSEOStatic<T extends (context: any) => any>(
  handler: T,
  options?: WithSEOOptions
): T {
  return (async (context: any) => {
    const result = (await handler?.(context)) ?? { props: {} };
    const path = resolvePath(context, options);
    const seo = await fetchSEO(path);
    return {
      ...result,
      props: {
        ...(result.props || {}),
        seo: seo || {}
      }
    };
  }) as T;
}

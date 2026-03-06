export type WithSEOOptions = {
    /**
     * Path for fetchSEO. Omit to infer from context (resolvedUrl or pathname).
     * Use a string for static override, or a function for dynamic routes.
     */
    path?: string | ((context: any) => string);
};
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
export declare function withSEO<T extends (context: any) => any>(handler: T, options?: WithSEOOptions): T;
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
export declare function withSEOStatic<T extends (context: any) => any>(handler: T, options?: WithSEOOptions): T;

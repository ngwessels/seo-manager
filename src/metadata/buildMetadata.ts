import { SEODefaults, SEOMetadataOptions } from "../types";

/**
 * Extracts and normalizes SEO fields from a fetchSEO response,
 * falling back to the provided defaults.
 */
export function mapFetchSEOToMetadata(seoData: any, defaults: SEODefaults = {}) {
  const page = seoData?.page || {};
  const global = seoData?.global || {};
  const title = page.title || global.defaultTitle || defaults.title || "";
  const description =
    page.description || global.defaultDescription || defaults.description || "";
  const keywords = page.keywords || defaults.keywords;
  const imageUrl = page.image?.url || defaults.image || "";
  const path = page.path || defaults.path || "";
  const canonicalBase = global.canonicalURL || "";
  const canonical =
    canonicalBase && path
      ? `${canonicalBase.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`
      : path
        ? path.startsWith("/")
          ? path
          : `/${path}`
        : defaults.canonical || "";
  const index = page.index === "noindex" ? false : true;
  const follow = page.follow === "nofollow" ? false : true;
  const structuredData = page.ldJson || null;

  return {
    title,
    description,
    keywords,
    imageUrl,
    canonical,
    index,
    follow,
    structuredData,
  };
}

/**
 * Builds a Next.js App Router metadata object from a fetchSEO response.
 * Shapes into openGraph, twitter, alternates, and robots fields.
 */
export function buildMetadataFromSEO(
  seoData: any,
  defaults: SEODefaults = {},
  options: SEOMetadataOptions = {}
) {
  const {
    title,
    description,
    keywords,
    imageUrl,
    canonical,
    index,
    follow,
    structuredData,
  } = mapFetchSEOToMetadata(seoData, defaults);

  const robots = options.robotsOverride ?? { index, follow };

  const metadata: any = {
    title: title || defaults.title,
    description: description || defaults.description,
    keywords: keywords || defaults.keywords,
    openGraph: {
      title: title || defaults.title,
      description: description || defaults.description,
      images: [
        {
          url: imageUrl || defaults.image,
          width: 1200,
          height: 630,
          alt: title || defaults.title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title || defaults.title,
      description: description || defaults.description,
      images: [imageUrl || defaults.image],
    },
    alternates: {
      canonical: canonical || defaults.canonical,
    },
    robots,
  };

  const resolvedStructuredData = options.structuredData || structuredData;
  if (resolvedStructuredData) {
    metadata.structuredData = resolvedStructuredData;
  }

  return metadata;
}

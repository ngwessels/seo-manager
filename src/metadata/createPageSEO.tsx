import { cache } from "react";
import { fetchSEO } from "../backend/index";
import { buildMetadataFromSEO } from "./buildMetadata";
import { SEODefaults, SEOMetadataOptions, FetchSEOHeaders } from "../types";
import { returnKey } from "../utilities/setupInit";

function getApiBaseUrl(): string {
  if (
    process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Test" &&
    process.env.NEXT_PUBLIC_NODE_ENV_MANAGER !== "Development"
  ) {
    return "https://v1.seomanager.dev";
  }
  if (process.env.NEXT_PUBLIC_NODE_ENV_MANAGER === "Test") {
    return "http://localhost:3002";
  }
  return "https://v1-testing.seomanager.dev";
}

interface CreatePageSEOOptions {
  metadataOptions?: SEOMetadataOptions;
  meta?: FetchSEOHeaders;
}

/**
 * Factory that creates cached SEO helpers for a single page.
 *
 * Uses React cache() so both generateMetadata and getSEOData
 * share a single fetchSEO call per request.
 *
 * @example
 * const pageSEO = createPageSEO("/dinner", DINNER_DEFAULTS);
 * export const generateMetadata = pageSEO.generateMetadata;
 *
 * export default async function Dinner() {
 *   const seo = await pageSEO.getSEOData();
 *   return <AppSEOHelper data={seo} />;
 * }
 */
export function createPageSEO(
  path: string,
  defaults: SEODefaults = {},
  options: CreatePageSEOOptions = {}
) {
  const getCachedSEO = cache(() => fetchSEO(path, options.meta));

  return {
    generateMetadata: async () => {
      try {
        const seoData = await getCachedSEO();
        return buildMetadataFromSEO(seoData, defaults, options.metadataOptions);
      } catch (error) {
        console.error("Error fetching SEO data:", error);
        return buildMetadataFromSEO({}, defaults, options.metadataOptions);
      }
    },

    getSEOData: async (): Promise<any> => {
      try {
        const seoData: any = await getCachedSEO();
        const keys = returnKey();
        const baseUrl = getApiBaseUrl();
        return {
          ...seoData,
          _ping: {
            url: `${baseUrl}/seo/ping`,
            projectId: keys.projectId || seoData?.global?.projectId || "",
            projectKey: keys.projectKey || "",
            pageId: seoData?.page?.pageId || "",
            path: seoData?.page?.path || "",
          },
        };
      } catch (error) {
        return null;
      }
    },
  };
}

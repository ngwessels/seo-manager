import React from "react";
/**
 * App Router version of SEOHelper.
 *
 * Client component that renders what generateMetadata cannot:
 * - ld+json structured data script tags (page.ldJson and page.events)
 * - Analytics ping (fires on every navigation via useEffect)
 *
 * The _ping config is attached server-side by createPageSEO.getSEOData(),
 * so no server-only imports are needed here.
 *
 * Does NOT render meta tags -- generateMetadata handles those.
 */
export declare function AppSEOHelper({ data }: {
    data: any;
}): React.JSX.Element | null;

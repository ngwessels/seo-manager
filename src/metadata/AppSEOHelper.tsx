"use client";

import React, { useEffect } from "react";

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
export function AppSEOHelper({ data }: { data: any }) {
  useEffect(() => {
    if (!data?._ping) return;
    const { url, projectId, projectKey, pageId, path } = data._ping;
    if (!pageId && !path) return;
    try {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          X_ProjectId: projectId,
          X_ProjectKey: projectKey,
        },
        body: JSON.stringify({
          pageId,
          path,
          clientTime: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || "",
        }),
      }).catch(() => {});
    } catch (_) {}
  }, [data?._ping]);

  if (!data) return null;

  const hasLdJson = !!data?.page?.ldJson;
  const hasEvents = !!data?.page?.events;

  if (!hasLdJson && !hasEvents) return null;

  return (
    <>
      {hasLdJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: data.page.ldJson }}
        />
      )}
      {hasEvents && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data.page.events),
          }}
        />
      )}
    </>
  );
}

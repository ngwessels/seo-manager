import {
  PageIdentifiers,
  PageSEO,
  FetchSEOHeaders,
  PageOptions
} from "../types";

declare function backendValidation(body: any): any;
declare function fetchSEO(path: string, meta: FetchSEOHeaders): any;
declare function insertSeoPage(pageSEO: PageSEO[]): any;
declare function updateSeoPage(
  pageIdentifiers: PageIdentifiers[],
  pageSEO: PageSEO[],
  options: PageOptions
): any;
declare function deleteSeoPage(pageIdentifiers: PageIdentifiers[]): any;
declare function getSeoPages(pageIdentifiers: PageIdentifiers): any;

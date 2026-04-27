import * as Q from "../sanity/queries";
import { loadQuery } from "../sanity/lib/load-query";
import { getDraftModeProps } from "../sanity/lib/draft-mode";
import type * as R from "../sanity/sanity.types";
import type { AstroCookies } from "astro";

export const resolveHomepageData = async (cookies: AstroCookies) => {
  const { data } = await loadQuery<R.HOMEPAGE_QUERY_RESULT>({
    query: Q.HOMEPAGE_QUERY,
    ...getDraftModeProps(cookies),
  });
  if (!data) {
    throw new Error("Could not get homepage data");
  }
  return data;
};

export const resolveEventsPageData = async (cookies: AstroCookies) => {
  const draftModeProps = getDraftModeProps(cookies);
  const { data } = await loadQuery<R.EVENTS_PAGE_QUERY_RESULT>({
    query: Q.EVENTS_PAGE_QUERY,
    ...draftModeProps,
  });
  if (!data) {
    throw new Error("Could not get events page data");
  }
  return data;
};

export const resolvePagesData = async () => {
  const { data } = await loadQuery<R.PAGES_QUERY_RESULT>({
    query: Q.PAGES_QUERY,
  });
  if (!data) {
    throw new Error("Could not get pages data");
  }
  return data;
};

export const resolvePageData = async (
  cookies: AstroCookies,
  slug: string | null,
) => {
  const { data } = await loadQuery<R.PAGE_QUERY_RESULT>({
    query: Q.PAGE_QUERY,
    params: { slug },
    ...getDraftModeProps(cookies),
  });
  if (!data) {
    throw new Error("Could not get page data");
  }
  return data;
};

export const resolveProjectsData = async () => {
  const { data } = await loadQuery<R.PROJECTS_QUERY_RESULT>({
    query: Q.PROJECTS_QUERY,
  });
  if (!data) {
    throw new Error("Could not get projects data");
  }
  return data;
};

export const resolveProjectData = async (
  cookies: AstroCookies,
  slug: string | null,
) => {
  const { data } = await loadQuery<R.PROJECT_QUERY_RESULT>({
    query: Q.PROJECT_QUERY,
    params: { slug },
    ...getDraftModeProps(cookies),
  });
  if (!data) {
    throw new Error("Could not get project data");
  }
  return data;
};

export const resolveBlogsPageData = async (cookies: AstroCookies) => {
  const { data } = await loadQuery<R.BLOGS_PAGE_QUERY_RESULT>({
    query: Q.BLOGS_PAGE_QUERY,
    ...getDraftModeProps(cookies),
  });
  if (!data) {
    throw new Error("Could not get blogs page data");
  }
  return data;
};

export const resolveBlogArticlesData = async () => {
  const { data } = await loadQuery<R.BLOG_ARTICLES_QUERY_RESULT>({
    query: Q.BLOG_ARTICLES_QUERY,
  });
  if (!data) {
    throw new Error("Could not get blog articles data");
  }
  return data;
};

export const resolveBlogArticleData = async (
  cookies: AstroCookies,
  slug: string | null,
) => {
  const { data } = await loadQuery<R.BLOG_ARTICLE_QUERY_RESULT>({
    query: Q.BLOG_ARTICLE_QUERY,
    params: { slug },
    ...getDraftModeProps(cookies),
  });
  if (!data) {
    throw new Error("Could not get blog article data");
  }
  return data;
};
